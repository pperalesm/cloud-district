import { Employee } from '../abstractions/employee.entity';

export class BaseEmployeeDto {
  id!: string;
  name!: string;
  salary!: number;
  clubId?: string;
  email!: string;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.name = employee.name;
    this.salary = employee.salary;
    this.clubId = employee.clubId;
    this.email = employee.email;
  }
}
