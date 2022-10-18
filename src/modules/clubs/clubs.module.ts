import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Club } from './club.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Club])],
  controllers: [],
  providers: [],
})
export class ClubsModule {}
