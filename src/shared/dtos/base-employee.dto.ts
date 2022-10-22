import { Employee } from '../abstractions/employee.entity';

export class BaseEmployeeDto {
  id!: string;
  name!: string;
  salary!: number;
  clubId?: string | null;
  email!: string;
  language!: string;

  constructor(employee: Employee) {
    this.id = employee.id;
    this.name = employee.name;
    this.salary = employee.salary;
    this.clubId = employee.clubId;
    this.email = employee.email;
    this.language = employee.language;
  }
}
