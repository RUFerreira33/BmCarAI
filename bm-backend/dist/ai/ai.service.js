"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AiService = void 0;
const common_1 = require("@nestjs/common");
const openai_1 = require("openai");
const bmcar_service_1 = require("../bmcar/bmcar.service");
let AiService = class AiService {
    constructor(bmcarService) {
        this.bmcarService = bmcarService;
        this.openai = new openai_1.default({
            baseURL: process.env.OLLAMA_BASE_URL || 'http://localhost:11434/v1',
            apiKey: 'ollama',
        });
    }
    async extrairFiltros(mensagem) {
        try {
            const resposta = await this.openai.chat.completions.create({
                model: process.env.OLLAMA_MODEL || 'llama3',
                temperature: 0,
                messages: [
                    {
                        role: 'system',
                        content: `
És um assistente que extrai filtros de pesquisa automóvel a partir da mensagem do utilizador.

Responde apenas com JSON válido.
Não escrevas explicações.
Não uses markdown.
Não inventes valores.
Se um campo não for mencionado, devolve null.

Regras obrigatórias:
- "BMW" deve ir para o campo "modelo".
- "SUV", "carrinha", "berlina", "coupé" devem ir para o campo "segmento", não para "tipo".
- "mota", "moto", "motociclo" devem ir para o campo "tipo" com valor "Moto".
- "carro", "automóvel", "automovel", "viatura" devem ir para o campo "tipo" com valor "Carro".
- "até X euros" significa "precoMax = X".
- "mais de X euros" significa "precoMin = X".
- "menos de X km" significa "kmsMax = X".
- "mais de X km" significa "kmsMin = X".
- Não coloques 0 por defeito. Usa null quando o utilizador não indicar valor.
- "jantes 19" ou "rodas 19" significa "rodas = 19".

Campos esperados:
{
  "tipo": string | null,
  "modelo": string | null,
  "segmento": string | null,
  "cor": string | null,
  "rodas": string | null,
  "precoMin": number | null,
  "precoMax": number | null,
  "kmsMin": number | null,
  "kmsMax": number | null,
  "combustivel": string | null,
  "transmissao": string | null,
  "observacoes": string | null
}
            `.trim(),
                    },
                    {
                        role: 'user',
                        content: mensagem,
                    },
                ],
            });
            const conteudo = resposta.choices[0]?.message?.content;
            if (!conteudo) {
                throw new Error('Resposta vazia do modelo.');
            }
            const jsonLimpo = conteudo
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            const resultado = JSON.parse(jsonLimpo);
            const texto = mensagem.toLowerCase();
            if (texto.includes('mota') ||
                texto.includes('moto') ||
                texto.includes('motociclo')) {
                resultado.tipo = 'Moto';
            }
            if (texto.includes('carro') ||
                texto.includes('automóvel') ||
                texto.includes('automovel') ||
                texto.includes('viatura')) {
                resultado.tipo = 'Carro';
            }
            if (texto.includes('suv') || texto.includes('jip')) {
                resultado.segmento = 'SUV';
            }
            if (texto.includes('carrinha') || texto.includes('touring')) {
                resultado.segmento = 'Carrinha';
            }
            if (texto.includes('berlina')) {
                resultado.segmento = 'Berlina';
            }
            if (texto.includes('coupé') || texto.includes('coupe')) {
                resultado.segmento = 'Coupé';
            }
            resultado.combustivel = this.normalizeCombustivel(resultado.combustivel ?? this.extractCombustivelFromText(texto));
            resultado.transmissao = this.normalizeTransmissao(resultado.transmissao ?? this.extractTransmissaoFromText(texto));
            if (texto.includes('até') &&
                resultado.precoMin != null &&
                resultado.precoMax == null) {
                resultado.precoMax = resultado.precoMin;
                resultado.precoMin = null;
            }
            if (texto.includes('mais de') &&
                resultado.precoMax != null &&
                resultado.precoMin == null) {
                resultado.precoMin = resultado.precoMax;
                resultado.precoMax = null;
            }
            if (resultado.precoMin != null &&
                resultado.precoMax != null &&
                resultado.precoMin === resultado.precoMax) {
                resultado.precoMin = null;
            }
            if (resultado.kmsMin === 0) {
                resultado.kmsMin = null;
            }
            if (typeof resultado.rodas === 'number') {
                resultado.rodas = String(resultado.rodas);
            }
            return {
                tipo: resultado.tipo ?? null,
                modelo: resultado.modelo ?? null,
                segmento: resultado.segmento ?? null,
                cor: resultado.cor ?? null,
                rodas: resultado.rodas ?? null,
                precoMin: resultado.precoMin ?? null,
                precoMax: resultado.precoMax ?? null,
                kmsMin: resultado.kmsMin ?? null,
                kmsMax: resultado.kmsMax ?? null,
                combustivel: resultado.combustivel ?? null,
                transmissao: resultado.transmissao ?? null,
                observacoes: resultado.observacoes ?? null,
            };
        }
        catch (erro) {
            console.error('ERRO OLLAMA:', erro?.message || erro);
            throw new common_1.InternalServerErrorException('Erro ao extrair filtros com o modelo local.');
        }
    }
    async recomendar(mensagem) {
        const filtros = await this.extrairFiltros(mensagem);
        const filtrosBmcar = {
            precoMin: filtros.precoMin ?? undefined,
            precoMax: filtros.precoMax ?? undefined,
            kmsMin: filtros.kmsMin ?? undefined,
            kmsMax: filtros.kmsMax ?? undefined,
        };
        const veiculos = await this.bmcarService.searchVehicles(filtrosBmcar);
        let resultados = veiculos;
        if (filtros.modelo) {
            const modeloPretendido = filtros.modelo.toLowerCase();
            resultados = resultados.filter((v) => {
                const brand = `${v.brand ?? ''}`.toLowerCase();
                const model = `${v.model ?? ''}`.toLowerCase();
                const name = `${v.name ?? ''}`.toLowerCase();
                return (brand.includes(modeloPretendido) ||
                    model.includes(modeloPretendido) ||
                    name.includes(modeloPretendido));
            });
        }
        if (filtros.tipo) {
            const tipoNormalizado = this.normalizeTipo(filtros.tipo);
            resultados = resultados.filter((v) => {
                const vehicleType = this.normalizeTipo(v.vehicleType);
                return vehicleType === tipoNormalizado;
            });
        }
        if (filtros.segmento) {
            const segmentoNormalizado = this.normalizeSegmento(filtros.segmento);
            resultados = resultados.filter((v) => {
                const vehicleType = this.normalizeTipo(v.vehicleType);
                const segment = this.normalizeSegmento(v.segment);
                if (!segmentoNormalizado)
                    return true;
                if (['SUV', 'Carrinha', 'Berlina', 'Coupé'].includes(segmentoNormalizado)) {
                    return vehicleType !== 'Moto' && segment === segmentoNormalizado;
                }
                return segment === segmentoNormalizado;
            });
        }
        else if (this.normalizeTipo(filtros.tipo) === 'Carro') {
            resultados = resultados.filter((v) => this.normalizeTipo(v.vehicleType) !== 'Moto');
        }
        if (filtros.combustivel) {
            const combustivelNormalizado = this.normalizeCombustivel(filtros.combustivel);
            resultados = resultados.filter((v) => {
                const fuel = this.normalizeCombustivel(v.fuel);
                return fuel === combustivelNormalizado;
            });
        }
        if (filtros.transmissao) {
            const transmissaoNormalizada = this.normalizeTransmissao(filtros.transmissao);
            resultados = resultados.filter((v) => {
                const transmission = this.normalizeTransmissao(v.transmission ?? v.gearbox ?? v.transmissao);
                if (!transmission)
                    return false;
                return transmission === transmissaoNormalizada;
            });
        }
        if (filtros.cor) {
            const corNormalizada = this.normalizeTextoSimples(filtros.cor);
            resultados = resultados.filter((v) => {
                const color = this.normalizeTextoSimples(v.color ?? v.cor);
                if (!color)
                    return false;
                return color.includes(corNormalizada);
            });
        }
        if (filtros.rodas) {
            const rodasNormalizadas = String(filtros.rodas).trim();
            resultados = resultados.filter((v) => {
                const rodas = `${v.wheels ?? v.rims ?? v.jantes ?? ''}`.trim();
                if (!rodas)
                    return false;
                return rodas.includes(rodasNormalizadas);
            });
        }
        const resultadosOrdenados = resultados
            .map((veiculo) => ({
            ...veiculo,
            score: this.calcularPontuacao(veiculo, filtros),
        }))
            .sort((a, b) => b.score - a.score);
        const topResultados = resultadosOrdenados.slice(0, 3);
        return {
            mensagemOriginal: mensagem,
            filtrosInterpretados: filtros,
            totalResultados: resultados.length,
            totalRecomendados: topResultados.length,
            mensagem: topResultados.length === 0
                ? 'Não foram encontrados veículos com todos os critérios pedidos.'
                : undefined,
            resultados: resultados,
            recomendados: topResultados,
        };
    }
    normalizeTipo(input) {
        if (!input)
            return null;
        const texto = input.toLowerCase().trim();
        if (texto.includes('moto') ||
            texto.includes('mota') ||
            texto.includes('motociclo')) {
            return 'Moto';
        }
        if (texto.includes('carro') ||
            texto.includes('automóvel') ||
            texto.includes('automovel') ||
            texto.includes('viatura')) {
            return 'Carro';
        }
        if (texto === 'moto')
            return 'Moto';
        if (texto === 'carro')
            return 'Carro';
        return input;
    }
    normalizeSegmento(input) {
        if (!input)
            return null;
        const texto = input.toLowerCase().trim();
        if (texto.includes('suv') ||
            texto.includes('sav') ||
            texto.includes('jip')) {
            return 'SUV';
        }
        if (texto.includes('carrinha') || texto.includes('touring')) {
            return 'Carrinha';
        }
        if (texto.includes('berlina')) {
            return 'Berlina';
        }
        if (texto.includes('coupé') || texto.includes('coupe')) {
            return 'Coupé';
        }
        if (texto.includes('moto') || texto.includes('motorrad')) {
            return 'Moto';
        }
        return input.trim();
    }
    normalizeCombustivel(input) {
        if (!input)
            return null;
        const texto = input.toLowerCase().trim();
        if (texto.includes('gasóleo') ||
            texto.includes('gasoleo') ||
            texto.includes('diesel')) {
            return 'Gasoleo';
        }
        if (texto.includes('gasolina') || texto.includes('petrol')) {
            return 'Gasolina';
        }
        if (texto.includes('elétrico') ||
            texto.includes('eletrico') ||
            texto.includes('electric')) {
            return 'Elétrico';
        }
        if (texto.includes('híbrido') ||
            texto.includes('hibrido') ||
            texto.includes('hybrid')) {
            return 'Híbrido';
        }
        return input.trim();
    }
    normalizeTransmissao(input) {
        if (!input)
            return null;
        const texto = input.toLowerCase().trim();
        if (texto.includes('automática') ||
            texto.includes('automatica') ||
            texto.includes('auto') ||
            texto.includes('automatic')) {
            return 'Automática';
        }
        if (texto.includes('manual')) {
            return 'Manual';
        }
        return input.trim();
    }
    extractCombustivelFromText(texto) {
        if (texto.includes('gasóleo') ||
            texto.includes('gasoleo') ||
            texto.includes('diesel')) {
            return 'Gasoleo';
        }
        if (texto.includes('gasolina')) {
            return 'Gasolina';
        }
        if (texto.includes('elétrico') ||
            texto.includes('eletrico') ||
            texto.includes('electric')) {
            return 'Elétrico';
        }
        if (texto.includes('híbrido') ||
            texto.includes('hibrido') ||
            texto.includes('hybrid')) {
            return 'Híbrido';
        }
        return null;
    }
    extractTransmissaoFromText(texto) {
        if (texto.includes('automática') ||
            texto.includes('automatica') ||
            texto.includes('caixa automática') ||
            texto.includes('caixa automatica') ||
            texto.includes('automatic')) {
            return 'Automática';
        }
        if (texto.includes('manual') || texto.includes('caixa manual')) {
            return 'Manual';
        }
        return null;
    }
    normalizeTextoSimples(input) {
        if (!input)
            return '';
        return input
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }
    calcularPontuacao(veiculo, filtros) {
        let score = 0;
        const year = Number(veiculo.year ?? 0);
        const kms = Number(veiculo.kilometers ?? 999999);
        const price = Number(veiculo.price ?? 999999);
        if (year > 0) {
            score += year;
        }
        if (kms >= 0) {
            score += Math.max(0, 100000 - kms) / 1000;
        }
        if (filtros.precoMax != null && price > 0 && price <= filtros.precoMax) {
            score += 50;
            score += Math.max(0, filtros.precoMax - price) / 1000;
        }
        if (filtros.precoMax != null && price > filtros.precoMax) {
            score -= 100;
        }
        if (filtros.precoMin != null && price >= filtros.precoMin) {
            score += 10;
        }
        if (filtros.combustivel &&
            this.normalizeCombustivel(veiculo.fuel) ===
                this.normalizeCombustivel(filtros.combustivel)) {
            score += 40;
        }
        if (filtros.tipo &&
            this.normalizeTipo(veiculo.vehicleType) ===
                this.normalizeTipo(filtros.tipo)) {
            score += 40;
        }
        if (filtros.segmento &&
            this.normalizeSegmento(veiculo.segment) ===
                this.normalizeSegmento(filtros.segmento)) {
            score += 40;
        }
        return score;
    }
};
exports.AiService = AiService;
exports.AiService = AiService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bmcar_service_1.BmcarService])
], AiService);
//# sourceMappingURL=ai.service.js.map