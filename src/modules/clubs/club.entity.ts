import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Coach } from '../coaches/coach.entity';
import { Player } from '../players/player.entity';
import { CreateClubDto } from './dtos/create-club.dto';
import { UpdateClubDto } from './dtos/update-club.dto';

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

  static create(createClubDto: CreateClubDto): Club {
    const club = new Club();

    club.name = createClubDto.name;
    club.budget = createClubDto.budget;

    return club;
  }

  setBudget(budget: number) {
    this.budget = budget;
  }

  isEnoughBudget(budget: number): boolean {
    let salarySum = this.players.reduce(
      (previous, current) => previous + current.salary,
      0,
    );

    salarySum = this.coaches.reduce(
      (previous, current) => previous + current.salary,
      salarySum,
    );

    return budget >= salarySum;
  }
}
