import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { I18n, I18nService } from 'nestjs-i18n';
import { Employee } from '../../shared/abstractions/employee.entity';
import { NotificationsService } from '../../shared/abstractions/notifications-service.interface';

@Injectable()
export class EmailsService implements NotificationsService {
  constructor(
    @I18n() private readonly i18n: I18nService,
    private readonly mailerService: MailerService,
  ) {}

  async sendRegisteredToClub(data: {
    employee: Employee;
    clubName: string;
  }): Promise<void> {
    await this.mailerService.sendMail({
      to: data.employee.email,
      subject: this.i18n.t('clubs.sendRegisteredToClub', {
        lang: data.employee.language,
      }),
      template: `${data.employee.language}/registered-to-club`,
      context: {
        employeeName: data.employee.name,
        clubName: data.clubName,
      },
    });
  }

  async sendDroppedFromClub(data: {
    employee: Employee;
    clubName: string;
  }): Promise<void> {
    await this.mailerService.sendMail({
      to: data.employee.email,
      subject: this.i18n.t('clubs.sendDroppedFromClub', {
        lang: data.employee.language,
      }),
      template: `${data.employee.language}/dropped-from-club`,
      context: {
        employeeName: data.employee.name,
        clubName: data.clubName,
      },
    });
  }
}
