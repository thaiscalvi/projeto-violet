import { PartialType } from '@nestjs/mapped-types';
import { CreateFarmerDto } from './create-farmer.dto';

export class UpdateFarmerDto extends PartialType(CreateFarmerDto) {
  cpf?: never;
}