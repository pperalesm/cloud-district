import { Entity, ManyToOne } from 'typeorm';
import { Employee } from '../employees/employee';
import { Club } from '../clubs/club.entity';
import { CreatePlayerDto } from './dtos/create-player.dto';

export const PLAYERS_TABLE = 'players';

@Entity(PLAYERS_TABLE)
export class Player extends Employee {
  @ManyToOne(() => Club, (club) => club.players, { nullable: true })
  club?: Club;

  static create(createPlayerDto: CreatePlayerDto): Player {
    const employee = Employee.create(createPlayerDto);

    return employee as Player;
  }
}
