import { Club } from '../club.entity';

export class BaseClubDto {
  id!: string;
  name!: string;
  budget!: number;

  constructor(club: Club) {
    this.id = club.id;
    this.name = club.name;
    this.budget = club.budget;
  }
}
