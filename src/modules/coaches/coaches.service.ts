import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomBadRequest } from '../../shared/exceptions/custom-bad-request';
import { CustomConflict } from '../../shared/exceptions/custom-conflict';
import { CustomNotFound } from '../../shared/exceptions/custom-not-found';
import { Coach } from './coach.entity';
import { CoachErrors } from './coach.errors';

@Injectable()
export class CoachesService {
  constructor(
    @InjectRepository(Coach)
    private readonly coachesRepository: Repository<Coach>,
  ) {}

  async create(data: { name: string; email: string }): Promise<Coach> {
    const conflictedCoach = await this.coachesRepository.findOne({
      where: { email: data.email },
    });

    if (conflictedCoach) {
      throw new CustomConflict([CoachErrors.EMAIL_UNIQUE]);
    }

    const newCoach = Coach.create(data);

    return await this.coachesRepository.save(newCoach);
  }

  async joinClub(data: {
    coachId: string;
    salary: number;
    clubId: string;
  }): Promise<Coach> {
    const currentCoach = await this.coachesRepository.findOne({
      where: { id: data.coachId },
    });

    if (!currentCoach) {
      throw new CustomNotFound([CoachErrors.NOT_FOUND]);
    }

    if (currentCoach.clubId) {
      throw new CustomBadRequest([CoachErrors.ALREADY_IN_CLUB]);
    }

    const updatedCoach = new Coach();
    updatedCoach.setId(currentCoach.id);
    updatedCoach.joinClub(data);

    return await this.coachesRepository.save(updatedCoach);
  }

  async leaveClub(data: { clubId: string; coachId: string }): Promise<Coach> {
    const currentCoach = await this.coachesRepository.findOne({
      where: { id: data.coachId },
    });

    if (!currentCoach) {
      throw new CustomNotFound([CoachErrors.NOT_FOUND]);
    }

    if (currentCoach.clubId !== data.clubId) {
      throw new CustomBadRequest([CoachErrors.NOT_IN_SPECIFIED_CLUB]);
    }

    const updatedCoach = new Coach();
    updatedCoach.setId(currentCoach.id);
    updatedCoach.leaveClub();

    return await this.coachesRepository.save(updatedCoach);
  }
}
