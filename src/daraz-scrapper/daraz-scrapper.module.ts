import { Module } from '@nestjs/common';
import { DarazScrapperService } from './daraz-scrapper.service';
import { DarazScrapperController } from './daraz-scrapper.controller';

@Module({
  controllers: [DarazScrapperController],
  providers: [DarazScrapperService],
})
export class DarazScrapperModule {}
