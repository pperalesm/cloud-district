import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ type: 'float', default: 0 })
  salary!: number;

  @Column({ nullable: true })
  clubId?: string;

  @Column({ unique: true })
  email!: string;

  static create(data: { name: string; email: string }): Employee {
    const employee = new Employee();

    employee.name = data.name;
    employee.email = data.email;

    return employee;
  }

  joinClub(data: { clubId: string; salary: number }) {
    this.clubId = data.clubId;
    this.salary = data.salary;
  }
}
