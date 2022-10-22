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

  @Column({ type: 'float' })
  budget!: number;

  @OneToMany(() => Player, (player) => player.club)
  players!: Player[];

  @OneToMany(() => Coach, (coach) => coach.club)
  coaches!: Coach[];

  static create(data: { name: string; budget: number }): Club {
    const club = new Club();

    club.name = data.name;
    club.budget = data.budget;

    return club;
  }

  setId(id: string): void {
    this.id = id;
  }

  setBudget(budget: number): void {
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
