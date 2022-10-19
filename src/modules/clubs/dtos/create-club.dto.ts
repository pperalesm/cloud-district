import { IsNumber, IsString, Min, MinLength } from 'class-validator';
import { ClubValidation } from './club.validation';

export class CreateClubDto {
  @MinLength(ClubValidation.NAME_MIN_LENGTH)
  @IsString()
  name!: string;

  @Min(ClubValidation.BUDGET_MIN)
  @IsNumber()
  budget!: number;
}
