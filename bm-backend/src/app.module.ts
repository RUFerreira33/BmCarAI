import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { CarrosModule } from './carros/carros.module';
import { BmcarModule } from './bmcar/bmcar.module'
import { AppController } from './app.controller';
import { AiModule } from './ai/ai.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    CarrosModule,
    BmcarModule,
    AiModule,
  ],
    controllers: [AppController],
})
export class AppModule {}