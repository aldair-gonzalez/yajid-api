import { PartialType } from '@nestjs/swagger';
import { CreatePackageImageDto } from './create-package-image.dto';

export class UpdatePackageImageDto extends PartialType(CreatePackageImageDto) {}
