import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NOTIFICATIONS_SERVICE_TOKEN } from '../../shared/abstractions/notifications-service.interface';
import { EmailsService } from '../emails/emails.service';
import { Player } from './player.entity';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';

@Module({
  imports: [TypeOrmModule.forFeature([Player])],
  controllers: [PlayersController],
  providers: [
    PlayersService,
    {
      provide: NOTIFICATIONS_SERVICE_TOKEN,
      useClass: EmailsService,
    },
  ],
  exports: [PlayersService],
})
export class PlayersModule {}
