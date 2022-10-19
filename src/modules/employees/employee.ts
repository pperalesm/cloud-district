import { Column, PrimaryGeneratedColumn } from 'typeorm';
import { CreateEmployeeDto } from './dtos/create-employee.dto';

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

  static create(createEmployeeDto: CreateEmployeeDto): Employee {
    const employee = new Employee();

    employee.name = createEmployeeDto.name;
    employee.email = createEmployeeDto.email;

    return employee;
  }

  joinClub(clubId: string, salary: number) {
    this.clubId = clubId;
    this.salary = salary;
  }
}
