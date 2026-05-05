import { Controller, Get, Query } from '@nestjs/common';
import { BmcarService } from './bmcar.service';
import { SearchVehiclesDto } from './dto/search-vehicles.dto';

@Controller('bmcar')
export class BmcarController {
  constructor(private readonly bmcarService: BmcarService) {}

  @Get('veiculos')
  async searchVehicles(@Query() query: SearchVehiclesDto) {
    return this.bmcarService.searchVehicles(query);
  }
}