import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomBadRequest } from '../../shared/exceptions/custom-bad-request';
import { CustomConflict } from '../../shared/exceptions/custom-conflict';
import { CustomNotFound } from '../../shared/exceptions/custom-not-found';
import { RegisterCoachDto } from '../clubs/dtos/register-coach.dto';
import { Coach } from './coach.entity';
import { CoachErrors } from './coach.errors';
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
      throw new CustomConflict([CoachErrors.EMAIL_UNIQUE]);
    }

    const newCoach = Coach.create(createCoachDto);

    return await this.coachesRepository.save(newCoach);
  }

  async joinClub(
    registerCoachDto: RegisterCoachDto,
    clubId: string,
  ): Promise<Coach> {
    const coach = await this.coachesRepository.findOne({
      where: { id: registerCoachDto.id },
    });

    if (!coach) {
      throw new CustomNotFound([CoachErrors.NOT_FOUND]);
    }

    if (coach.clubId) {
      throw new CustomBadRequest([CoachErrors.ALREADY_IN_CLUB]);
    }

    coach.joinClub(clubId, registerCoachDto.salary);

    return await this.coachesRepository.save(coach);
  }
}
