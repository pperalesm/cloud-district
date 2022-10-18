import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'float', default: 0 })
  salary!: number;

  @Column({ nullable: true })
  clubId?: string;
}
