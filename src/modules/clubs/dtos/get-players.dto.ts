import { IsOptional, IsString } from 'class-validator';
import { PaginationDto } from '../../../shared/dtos/pagination.dto';
import { ClubValidation } from './club.validation';

export class GetPlayersDto extends PaginationDto {
  @IsString()
  @IsOptional()
  name: string = ClubValidation.DEFAULT_NAME;
}
