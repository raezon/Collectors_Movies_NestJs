import { PartialType } from '@nestjs/swagger';
import { CreateCollectorDto } from './create-collector.dto';

export class UpdateCollectorDto extends PartialType(CreateCollectorDto) {}
