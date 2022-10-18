import { Entity, ManyToOne } from 'typeorm';
import { Employee } from '../../shared/abstractions/employee';
import { Club } from '../clubs/club.entity';
import { CreatePlayerDto } from './create-player.dto';

export const PLAYERS_TABLE = 'players';

@Entity(PLAYERS_TABLE)
export class Player extends Employee {
  @ManyToOne(() => Club, (club) => club.players, { nullable: true })
  club?: Club;

  static create(createPlayerDto: CreatePlayerDto) {
    const player = new Player();

    player.name = createPlayerDto.name;

    return player;
  }
}
