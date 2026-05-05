import { BmcarService } from '../bmcar/bmcar.service';
type FiltrosExtraidos = {
    tipo?: string | null;
    modelo?: string | null;
    segmento?: string | null;
    cor?: string | null;
    rodas?: string | null;
    precoMin?: number | null;
    precoMax?: number | null;
    kmsMin?: number | null;
    kmsMax?: number | null;
    combustivel?: string | null;
    transmissao?: string | null;
    observacoes?: string | null;
};
export declare class AiService {
    private readonly bmcarService;
    constructor(bmcarService: BmcarService);
    private readonly openai;
    extrairFiltros(mensagem: string): Promise<FiltrosExtraidos>;
    recomendar(mensagem: string): Promise<{
        mensagemOriginal: string;
        filtrosInterpretados: FiltrosExtraidos;
        totalResultados: number;
        totalRecomendados: number;
        mensagem: string;
        resultados: any[];
        recomendados: any[];
    }>;
    private normalizeTipo;
    private normalizeSegmento;
    private normalizeCombustivel;
    private normalizeTransmissao;
    private extractCombustivelFromText;
    private extractTransmissaoFromText;
    private normalizeTextoSimples;
    private calcularPontuacao;
}
export {};
