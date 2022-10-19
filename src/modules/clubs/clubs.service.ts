import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomBadRequest } from '../../shared/exceptions/custom-bad-request';
import { CustomNotFound } from '../../shared/exceptions/custom-not-found';
import { Club } from './club.entity';
import { CreateClubDto } from './dtos/create-club.dto';
import { UpdateBudgetDto } from './dtos/update-budget.dto';

@Injectable()
export class ClubsService {
  constructor(
    @InjectRepository(Club)
    private readonly clubsRepository: Repository<Club>,
  ) {}

  async create(createClubDto: CreateClubDto): Promise<Club> {
    const newClub = Club.create(createClubDto);
    return await this.clubsRepository.save(newClub);
  }

  async updateBudget(
    id: string,
    updateBudgetDto: UpdateBudgetDto,
  ): Promise<Club> {
    const club = await this.clubsRepository.findOne({
      relations: { players: true, coaches: true },
      where: { id: id },
    });
    if (!club) {
      throw new CustomNotFound(['Club not found']);
    }
    if (!club.isEnoughBudget(updateBudgetDto.budget)) {
      throw new CustomBadRequest([
        'budget must not be less than all salaries combined',
      ]);
    }

    club.updateBudget(updateBudgetDto);
    return await this.clubsRepository.save(club);
  }
}
