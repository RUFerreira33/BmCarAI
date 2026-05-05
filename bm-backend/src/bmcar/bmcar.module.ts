import {Module} from '@nestjs/common';
import {HttpModule} from '@nestjs/axios';
import {BmcarController} from './bmcar.controller';
import {BmcarService} from './bmcar.service';

@Module({
    imports: [HttpModule],
    controllers: [BmcarController],
    providers: [BmcarService],
    exports:[BmcarService]
})

export class BmcarModule {}




