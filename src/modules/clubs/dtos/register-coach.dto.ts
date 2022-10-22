import { IsNumber, IsUUID, Min, UUIDVersion } from 'class-validator';
import { ClubValidation } from './club.validation';

export class RegisterCoachDto {
  @IsUUID(ClubValidation.UUID_VERSION as UUIDVersion)
  coachId!: string;

  @Min(ClubValidation.SALARY_MIN)
  @IsNumber()
  salary!: number;
}
