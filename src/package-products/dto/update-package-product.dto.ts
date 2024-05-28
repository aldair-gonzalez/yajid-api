import { PartialType } from '@nestjs/swagger';
import { CreatePackageProductDto } from './create-package-product.dto';

export class UpdatePackageProductDto extends PartialType(CreatePackageProductDto) {}
