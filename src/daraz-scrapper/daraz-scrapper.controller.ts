import { Controller, Get } from '@nestjs/common';
import { DarazScrapperService } from './daraz-scrapper.service';

@Controller('daraz-scrapper')
export class DarazScrapperController {
  constructor(private readonly darazScrapperService: DarazScrapperService) {}

  @Get()
    async test(){
        return this.darazScrapperService.scrapeData()
    }
}
