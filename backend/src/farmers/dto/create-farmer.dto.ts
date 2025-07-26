import { IsString, IsOptional, IsBoolean, IsDateString, IsNotEmpty, Matches } from 'class-validator';

export class CreateFarmerDto {
  @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
  @IsString()
  fullName: string;

  @IsNotEmpty({ message: 'O CPF é obrigatório.' })
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'O CPF deve estar no formato 000.000.000-00',
  })
  cpf: string;

  @IsOptional()
  @IsDateString({}, { message: 'A data de nascimento deve estar em formato ISO (yyyy-mm-dd).' })
  birthDate?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsBoolean()
  active?: boolean;
}