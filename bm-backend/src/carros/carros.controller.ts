import { Controller, Get, Query } from '@nestjs/common';
import { CarrosService } from './carros.service';

@Controller('carros')
export class CarrosController {
  constructor(private readonly carrosService: CarrosService) {}

  @Get()
  async listar(@Query() query: any) {
    const temFiltros = Object.keys(query).length > 0;

    if (temFiltros) {
      return this.carrosService.pesquisar(query);
    }

    return this.carrosService.listarTodos();
  }
}