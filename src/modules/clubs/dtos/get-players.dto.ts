import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';

export class GetPlayersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name?: string;
}
