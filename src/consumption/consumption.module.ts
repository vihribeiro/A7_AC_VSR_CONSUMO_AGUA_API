import { Module } from '@nestjs/common';
import { ConsumptionService } from './consumption.service';
import { ConsumptionController } from './consumption.controller';

@Module({
  providers: [ConsumptionService],
  controllers: [ConsumptionController]
})
export class ConsumptionModule {}
