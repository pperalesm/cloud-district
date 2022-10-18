import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coach } from './coach.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Coach])],
  controllers: [],
  providers: [],
})
export class CoachesModule {}
