import { PartialType } from '@nestjs/swagger';
import { CreateAddressTypeDto } from './create-address-type.dto';

export class UpdateAddressTypeDto extends PartialType(CreateAddressTypeDto) {}
