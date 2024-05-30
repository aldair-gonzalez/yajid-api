import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { OrderLinesService } from './order-lines.service';
import { OrderLinesController } from './order-lines.controller';
import { OrderLine } from './entities/order-line.entity';

@Module({
  imports: [TypeOrmModule.forFeature([OrderLine])],
  controllers: [OrderLinesController],
  providers: [OrderLinesService],
  exports: [TypeOrmModule, OrderLinesService],
})
export class OrderLinesModule {}
