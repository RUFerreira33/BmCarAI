import { HttpService } from '@nestjs/axios';
import { SearchVehiclesDto } from './dto/search-vehicles.dto';
export declare class BmcarService {
    private readonly httpService;
    constructor(httpService: HttpService);
    private buildUrl;
    searchVehicles(filters: SearchVehiclesDto): Promise<any[]>;
    private mapVehicle;
    private normalizeFuel;
    private normalizeSegment;
    private normalizeVehicleType;
    private normalizeName;
    private applyFilters;
    private normalizeText;
}
