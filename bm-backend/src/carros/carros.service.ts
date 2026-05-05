import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class CarrosService {
  constructor(private readonly prisma: PrismaService) {}

  async listarTodos() {
    return this.prisma.carro.findMany({
      where: {
        ativo: true,
      },
      orderBy: {
        criadoEm: 'desc',
      },
    });
  }

  async pesquisar(filtros: any) {
    const where: any = {
      ativo: true,
    };

    if (filtros.precoMax) {
      where.preco = {
        lte: Number(filtros.precoMax),
      };
    }

    if (filtros.precoMin) {
      where.preco = {
        ...where.preco,
        gte: Number(filtros.precoMin),
      };
    }

    if (filtros.carrocaria) {
      where.carrocaria = {
        equals: filtros.carrocaria,
        mode: 'insensitive',
      };
    }

    if (filtros.cor) {
      where.cor = {
        equals: filtros.cor,
        mode: 'insensitive',
      };
    }

    if (filtros.transmissao) {
      where.transmissao = {
        equals: filtros.transmissao,
        mode: 'insensitive',
      };
    }

    if (filtros.modelo) {
      where.modelo = {
        contains: filtros.modelo,
        mode: 'insensitive',
      };
    }

    return this.prisma.carro.findMany({
      where,
      orderBy: {
        preco: 'asc',
      },
    });
  }
}