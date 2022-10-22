import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NOTIFICATIONS_SERVICE_TOKEN } from '../../shared/abstractions/notifications-service.interface';
import { EmailsService } from '../emails/emails.service';
import { Coach } from './coach.entity';
import { CoachesController } from './coaches.controller';
import { CoachesService } from './coaches.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  controllers: [CoachesController],
  providers: [
    CoachesService,
    {
      provide: NOTIFICATIONS_SERVICE_TOKEN,
      useClass: EmailsService,
    },
  ],
  exports: [CoachesService],
})
export class CoachesModule {}
