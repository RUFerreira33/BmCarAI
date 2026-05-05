import { Body, Controller, Post } from '@nestjs/common';
import { AiService } from './ai.service';
import { ChatMessageDto } from './dto/chat-message.dto';

@Controller('chat')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post('interpretar')
  async interpretar(@Body() body: ChatMessageDto) {
    const filtros = await this.aiService.extrairFiltros(body.mensagem);

    return {
      mensagemOriginal: body.mensagem,
      filtros,
    };
  }

  @Post('recomendar')
  async recomendar(@Body() body: ChatMessageDto) {
    return this.aiService.recomendar(body.mensagem);
   }
}