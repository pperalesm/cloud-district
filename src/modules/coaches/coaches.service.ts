import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomConflict } from '../../shared/exceptions/custom-conflict';
import { Coach } from './coach.entity';
import { CreateCoachDto } from './dtos/create-coach.dto';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachesRepository: Repository<Coach>,
  ) {}

  async create(createCoachDto: CreateCoachDto): Promise<Coach> {
    const conflictedCoach = await this.coachesRepository.findOne({
      where: { email: createCoachDto.email },
    });
    if (conflictedCoach) {
      throw new CustomConflict(['A coach already exists with such email']);
    }

    const newCoach = Coach.create(createCoachDto);
    return await this.coachesRepository.save(newCoach);
  }
}
