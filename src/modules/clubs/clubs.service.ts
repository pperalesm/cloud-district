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
import { CreateClubDto } from './dtos/create-club.dto';
import { RegisterCoachDto } from './dtos/register-coach.dto';
import { RegisterPlayerDto } from './dtos/register-player.dto';
import { UpdateClubDto } from './dtos/update-club.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubsRepository: Repository<Club>,
    private readonly playersService: PlayersService,
    private readonly coachesService: CoachesService,
  ) {}

  async create(createClubDto: CreateClubDto): Promise<Club> {
    const newClub = Club.create(createClubDto);

    return await this.clubsRepository.save(newClub);
  }

  async update(id: string, updateClubDto: UpdateClubDto): Promise<Club> {
    const club = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: id },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    if (updateClubDto.budget !== undefined) {
      if (!club.isEnoughBudget(updateClubDto.budget)) {
        throw new CustomBadRequest([ClubErrors.NOT_ENOUGH_BUDGET]);
      }

      club.setBudget(updateClubDto.budget);
    }

    return await this.clubsRepository.save(club);
  }

  async registerPlayer(
    id: string,
    registerPlayerDto: RegisterPlayerDto,
  ): Promise<Player> {
    const club = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: id },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    if (!club.isEnoughBudget(club.budget - registerPlayerDto.salary)) {
      throw new CustomBadRequest([ClubErrors.NOT_ENOUGH_BUDGET]);
    }

    return await this.playersService.joinClub(registerPlayerDto, id);
  }

  async registerCoach(
    id: string,
    registerCoachDto: RegisterCoachDto,
  ): Promise<Coach> {
    const club = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: id },
    });

    if (!club) {
      throw new CustomNotFound([ClubErrors.NOT_FOUND]);
    }

    if (!club.isEnoughBudget(club.budget - registerCoachDto.salary)) {
      throw new CustomBadRequest([ClubErrors.NOT_ENOUGH_BUDGET]);
    }

    return await this.coachesService.joinClub(registerCoachDto, id);
  }
}
