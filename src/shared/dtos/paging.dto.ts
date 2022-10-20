import { IsInt, IsOptional, Max, Min } from 'class-validator';
import { PagingValidation } from './paging.validation';

export class PagingDto {
  @Min(PagingValidation.TAKE_MIN)
  @Max(PagingValidation.TAKE_MAX)
  @IsInt()
  @IsOptional()
  take?: number;

  @Min(PagingValidation.SKIP_MIN)
  @IsInt()
  @IsOptional()
  skip?: number;
}
