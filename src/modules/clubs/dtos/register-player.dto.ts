import { IsNumber, IsUUID, Min, UUIDVersion } from 'class-validator';
import { ClubValidation } from './club.validation';

export class RegisterPlayerDto {
  @IsUUID(ClubValidation.UUID_VERSION as UUIDVersion)
  playerId!: string;

  @Min(ClubValidation.SALARY_MIN)
  @IsNumber()
  salary!: number;
}
