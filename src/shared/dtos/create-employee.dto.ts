import {
  IsAlpha,
  IsEmail,
  IsOptional,
  Matches,
  MinLength,
} from 'class-validator';
import { EmployeeValidation } from './employee.validation';

export class CreateEmployeeDto {
  @Matches(EmployeeValidation.NAME_REGEX)
  name!: string;

  @IsEmail()
  email!: string;

  @MinLength(EmployeeValidation.LANGUAGE_LENGTH)
  @IsAlpha()
  @IsOptional()
  language: string = EmployeeValidation.DEFAULT_LANGUAGE;
}
