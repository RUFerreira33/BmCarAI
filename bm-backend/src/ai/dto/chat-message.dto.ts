import { IsString, MinLength } from 'class-validator';

export class ChatMessageDto {
  @IsString()
  @MinLength(2)
  mensagem: string;
}