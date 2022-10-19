import { IsNumber, Min } from 'class-validator';
import { ClubValidation } from './club.validation';

export class UpdateBudgetDto {
  @Min(ClubValidation.BUDGET_MIN)
  @IsNumber()
  budget!: number;
}
