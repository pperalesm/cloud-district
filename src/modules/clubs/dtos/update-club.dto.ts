import { IsNumber, IsOptional, Min } from 'class-validator';
import { ClubValidation } from './club.validation';

export class UpdateClubDto {
  @Min(ClubValidation.BUDGET_MIN)
  @IsNumber()
  @IsOptional()
  budget?: number;
}
