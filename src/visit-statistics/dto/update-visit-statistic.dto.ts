import { PartialType } from '@nestjs/swagger';
import { CreateVisitStatisticDto } from './create-visit-statistic.dto';

export class UpdateVisitStatisticDto extends PartialType(CreateVisitStatisticDto) {}
