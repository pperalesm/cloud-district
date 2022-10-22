import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { PaginationValidation } from './pagination.validation';

export class PaginationDto {
  @Min(PaginationValidation.TAKE_MIN)
  @Max(PaginationValidation.TAKE_MAX)
  @IsInt()
  @IsOptional()
  take: number = PaginationValidation.DEFAULT_TAKE;

  @Min(PaginationValidation.SKIP_MIN)
  @IsInt()
  @IsOptional()
  skip: number = PaginationValidation.DEFAULT_SKIP;
}
