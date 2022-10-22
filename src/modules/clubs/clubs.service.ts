import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomBadRequest } from '../../shared/exceptions/custom-bad-request';
import { CustomNotFound } from '../../shared/exceptions/custom-not-found';
import { Coach } from '../coaches/coach.entity';
import { CoachesService } from '../coaches/coaches.service';
import { Player } from '../players/player.entity';
import { PlayersService } from '../players/players.service';
import { Club } from './club.entity';
import { ClubErrors } from './club.errors';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubsRepository: Repository<Club>,
    private readonly playersService: PlayersService,
    private readonly coachesService: CoachesService,
  ) {}

  async create(data: { name: string; budget: number }): Promise<Club> {
    const newClub = Club.create(data);

    return await this.clubsRepository.save(newClub);
  }

  async update(data: { clubId: string; budget?: number }): Promise<Club> {
    const currentClub = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: data.clubId },
    });

    if (!currentClub) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    const updatedClub = new Club();
    updatedClub.setId(currentClub.id);

    if (data.budget !== undefined) {
      if (!currentClub.isEnoughBudget(data.budget)) {
        throw new CustomBadRequest([ClubErrors.NOT_ENOUGH_BUDGET]);
      }

      updatedClub.setBudget(data.budget);
    }

    return await this.clubsRepository.save(updatedClub);
  }

  async registerPlayer(data: {
    clubId: string;
    playerId: string;
    salary: number;
  }): Promise<Player> {
    const club = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: data.clubId },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    if (!club.isEnoughBudget(club.budget - data.salary)) {
      throw new CustomBadRequest([ClubErrors.NOT_ENOUGH_BUDGET]);
    }

    return await this.playersService.joinClub({ ...data, clubName: club.name });
  }

  async registerCoach(data: {
    clubId: string;
    coachId: string;
    salary: number;
  }): Promise<Coach> {
    const club = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: data.clubId },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    if (!club.isEnoughBudget(club.budget - data.salary)) {
      throw new CustomBadRequest([ClubErrors.NOT_ENOUGH_BUDGET]);
    }

    return await this.coachesService.joinClub({ ...data, clubName: club.name });
  }

  async dropPlayer(data: {
    clubId: string;
    playerId: string;
  }): Promise<Player> {
    const club = await this.clubsRepository.findOne({
      where: { id: data.clubId },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    return await this.playersService.leaveClub({
      ...data,
      clubName: club.name,
    });
  }

  async dropCoach(data: { clubId: string; coachId: string }): Promise<Coach> {
    const club = await this.clubsRepository.findOne({
      where: { id: data.clubId },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    return await this.coachesService.leaveClub({
      ...data,
      clubName: club.name,
    });
  }

  async getPlayers(data: {
    clubId: string;
    name: string;
    take: number;
    skip: number;
  }): Promise<Player[]> {
    const club = await this.clubsRepository.findOne({
      where: { id: data.clubId },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    return await this.playersService.getAllFromClub(data);
  }
}
