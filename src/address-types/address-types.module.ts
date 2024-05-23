import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AddressTypesService } from './address-types.service';
import { AddressTypesController } from './address-types.controller';
import { AddressType } from './entities/address-type.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AddressType])],
  controllers: [AddressTypesController],
  providers: [AddressTypesService],
  exports: [TypeOrmModule, AddressTypesService],
})
export class AddressTypesModule {}
