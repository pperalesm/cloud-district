import { Employee } from './employee.entity';

export const NOTIFICATIONS_SERVICE_TOKEN = 'NotificationsService';

export interface NotificationsService {
  sendRegisteredToClub: (data: {
    employee: Employee;
    clubName: string;
  }) => Promise<void>;
  sendDroppedFromClub: (data: {
    employee: Employee;
    clubName: string;
  }) => Promise<void>;
}
