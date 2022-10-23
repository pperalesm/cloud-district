import { IsEmail, IsIn, IsOptional, Matches } from 'class-validator';
import { EmployeeValidation } from './employee.validation';

export class CreateEmployeeDto {
  @Matches(EmployeeValidation.NAME_REGEX)
  name!: string;

  @IsEmail()
  email!: string;

  @IsIn(EmployeeValidation.AVAILABLE_LANGUAGES)
  @IsOptional()
  language: string = EmployeeValidation.DEFAULT_LANGUAGE;
}
