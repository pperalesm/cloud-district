import { Entity, ManyToOne } from 'typeorm';
import { Employee } from '../../shared/abstractions/employee.entity';
import { Club } from '../clubs/club.entity';

export const PLAYERS_TABLE = 'players';

@Entity(PLAYERS_TABLE)
export class Player extends Employee {
  @ManyToOne(() => Club, (club) => club.players, { nullable: true })
  club?: Club;

  static create(data: {
    name: string;
    email: string;
    language: string;
  }): Player {
    const employee = Employee.create(data);

    return employee as Player;
  }
}
