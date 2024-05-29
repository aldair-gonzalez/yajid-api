import { PartialType } from '@nestjs/swagger';
import { CreateProductPriceHistoryDto } from './create-product-price-history.dto';

export class UpdateProductPriceHistoryDto extends PartialType(CreateProductPriceHistoryDto) {}
