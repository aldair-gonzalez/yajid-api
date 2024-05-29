import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PackageImagesService } from './package-images.service';
import { PackageImagesController } from './package-images.controller';
import { PackageImage } from './entities/package-image.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PackageImage])],
  controllers: [PackageImagesController],
  providers: [PackageImagesService],
  exports: [TypeOrmModule, PackageImagesService],
})
export class PackageImagesModule {}
