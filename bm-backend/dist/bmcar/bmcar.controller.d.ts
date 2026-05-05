import { BmcarService } from './bmcar.service';
import { SearchVehiclesDto } from './dto/search-vehicles.dto';
export declare class BmcarController {
    private readonly bmcarService;
    constructor(bmcarService: BmcarService);
    searchVehicles(query: SearchVehiclesDto): Promise<any[]>;
}
