import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoachesModule } from '../coaches/coaches.module';
import { PlayersModule } from '../players/players.module';
import { Club } from './club.entity';
import { ClubsController } from './clubs.controller';
import { ClubsService } from './clubs.service';

@Module({
  imports: [TypeOrmModule.forFeature([Club]), PlayersModule, CoachesModule],
  controllers: [ClubsController],
  providers: [ClubsService],
})
export class ClubsModule {}
