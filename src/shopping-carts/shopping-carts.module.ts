import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ShoppingCartsService } from './shopping-carts.service';
import { ShoppingCartsController } from './shopping-carts.controller';
import { ShoppingCart } from './entities/shopping-cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ShoppingCart])],
  controllers: [ShoppingCartsController],
  providers: [ShoppingCartsService],
  exports: [TypeOrmModule, ShoppingCartsService],
})
export class ShoppingCartsModule {}
