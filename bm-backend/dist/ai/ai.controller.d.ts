import { AiService } from './ai.service';
import { ChatMessageDto } from './dto/chat-message.dto';
export declare class AiController {
    private readonly aiService;
    constructor(aiService: AiService);
    interpretar(body: ChatMessageDto): Promise<{
        mensagemOriginal: string;
        filtros: {
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
    }>;
    recomendar(body: ChatMessageDto): Promise<{
        mensagemOriginal: string;
        filtrosInterpretados: {
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
        totalResultados: number;
        totalRecomendados: number;
        mensagem: string;
        resultados: any[];
        recomendados: any[];
    }>;
}
