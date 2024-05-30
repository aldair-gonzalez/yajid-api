import { PartialType } from '@nestjs/swagger';
import { CreatePackagePriceHistoryDto } from './create-package-price-history.dto';

export class UpdatePackagePriceHistoryDto extends PartialType(CreatePackagePriceHistoryDto) {}
