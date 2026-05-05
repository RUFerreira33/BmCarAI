import { CarrosService } from './carros.service';
export declare class CarrosController {
    private readonly carrosService;
    constructor(carrosService: CarrosService);
    listar(query: any): Promise<{
        id: string;
        bmcarId: string | null;
        slug: string | null;
        url: string;
        marca: string;
        modelo: string | null;
        versao: string | null;
        titulo: string;
        tipoAnuncio: string | null;
        preco: import("@prisma/client/runtime/library").Decimal | null;
        ano: number | null;
        quilometros: number | null;
        combustivel: string | null;
        transmissao: string | null;
        potenciaCv: number | null;
        cilindrada: number | null;
        traccao: string | null;
        carrocaria: string | null;
        cor: string | null;
        portas: number | null;
        lugares: number | null;
        localizacao: string | null;
        descricao: string | null;
        ativo: boolean;
        ultimaSincronizacao: Date | null;
        criadoEm: Date;
        atualizadoEm: Date;
    }[]>;
}
