import { PartialType } from '@nestjs/swagger';
import { CreatePackageDiscountDto } from './create-package-discount.dto';

export class UpdatePackageDiscountDto extends PartialType(CreatePackageDiscountDto) {}
