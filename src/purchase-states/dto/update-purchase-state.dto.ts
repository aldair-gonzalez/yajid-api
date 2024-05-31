import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseStateDto } from './create-purchase-state.dto';

export class UpdatePurchaseStateDto extends PartialType(
  CreatePurchaseStateDto,
) {}
