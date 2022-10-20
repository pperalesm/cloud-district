import { IsOptional, IsString } from 'class-validator';
import { PagingDto } from '../../../shared/dtos/paging.dto';

export class GetPlayersDto extends PagingDto {
  @IsString()
  @IsOptional()
  name?: string;
}
