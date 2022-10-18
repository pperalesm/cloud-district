import { Entity, ManyToOne } from 'typeorm';
import { Employee } from '../../shared/abstractions/employee';
import { Club } from '../clubs/club.entity';

export const COACHES_TABLE = 'coaches';

@Entity(COACHES_TABLE)
export class Coach extends Employee {
  @ManyToOne(() => Club, (club) => club.coaches, { nullable: true })
  club?: Club;
}
