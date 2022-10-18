import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coach } from '../coaches/coach.entity';
import { Player } from '../players/player.entity';

export const CLUBS_TABLE = 'clubs';

@Entity(CLUBS_TABLE)
export class Club {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'float', default: 0 })
  budget!: number;

  @OneToMany(() => Player, (player) => player.club)
  players!: Player[];

  @OneToMany(() => Coach, (coach) => coach.club)
  coaches!: Coach[];
}
