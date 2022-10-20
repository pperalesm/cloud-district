import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { I18n, I18nService } from 'nestjs-i18n';
import { NotificationsService } from '../../shared/abstractions/notifications-service.interface';

@Injectable()
export class EmailsService implements NotificationsService {
  constructor(
    @I18n() private readonly i18n: I18nService,
    private readonly mailerService: MailerService,
  ) {}

  async sendJoinedClub() {
    return;
  }

  async sendDroppedClub() {
    return;
  }

  async userActivation(user: any) {
    await this.mailerService.sendMail({
      to: user.email,
      subject: this.i18n.t('auth.UserActivation', {
        lang: user.language,
      }),
      template: `${user.language}/user-activation`,
      context: {
        name: user.name || user.username,
        url: `doyen.app/auth/activate?token=`,
      },
    });
  }
}
