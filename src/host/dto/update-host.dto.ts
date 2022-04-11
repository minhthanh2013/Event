import { PartialType } from '@nestjs/mapped-types';
import { CreateHostDto } from './create-host.dto';

export class UpdateHostDto extends PartialType(CreateHostDto) {}
