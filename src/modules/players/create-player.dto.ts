import { IsAlpha, MinLength } from 'class-validator';
import { Constants } from '../../shared/util/constants';

export class CreatePlayerDto {
  @MinLength(Constants.PLAYER_NAME_MIN_LENGTH)
  @IsAlpha()
  name!: string;
}
