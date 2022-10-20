import { IsAlpha, IsEmail, MinLength } from 'class-validator';
import { EmployeeValidation } from './employee.validation';

export class CreateEmployeeDto {
  @MinLength(EmployeeValidation.NAME_MIN_LENGTH)
  @IsAlpha()
  name!: string;

  @IsEmail()
  email!: string;
}
