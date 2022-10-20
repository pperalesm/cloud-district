import { Entity, ManyToOne } from 'typeorm';
import { Employee } from '../../shared/abstractions/employee.entity';
import { Club } from '../clubs/club.entity';
import { CreateCoachDto } from './dtos/create-coach.dto';

export const COACHES_TABLE = 'coaches';

@Entity(COACHES_TABLE)
export class Coach extends Employee {
  @ManyToOne(() => Club, (club) => club.coaches, { nullable: true })
  club?: Club;

  static create(createCoachDto: CreateCoachDto): Coach {
    const employee = Employee.create(createCoachDto);

    return employee as Coach;
  }
}
