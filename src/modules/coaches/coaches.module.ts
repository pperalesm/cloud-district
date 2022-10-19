import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './coach.entity';
import { CoachesController } from './coaches.controller';
import { CoachesService } from './coaches.service';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  controllers: [CoachesController],
  providers: [CoachesService],
})
export class CoachesModule {}
