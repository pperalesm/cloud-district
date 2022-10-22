import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CustomBadRequest } from '../../shared/exceptions/custom-bad-request';
import { CustomConflict } from '../../shared/exceptions/custom-conflict';
import { CustomNotFound } from '../../shared/exceptions/custom-not-found';
import { Player } from './player.entity';
import { PlayerErrors } from './player.errors';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async create(data: { name: string; email: string }): Promise<Player> {
    const conflictedPlayer = await this.playersRepository.findOne({
      where: { email: data.email },
    });

    if (conflictedPlayer) {
      throw new CustomConflict([PlayerErrors.EMAIL_UNIQUE]);
    }

    const newPlayer = Player.create(data);

    return await this.playersRepository.save(newPlayer);
  }

  async joinClub(data: {
    playerId: string;
    salary: number;
    clubId: string;
  }): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id: data.playerId },
    });

    if (!player) {
      throw new CustomNotFound([PlayerErrors.NOT_FOUND]);
    }

    if (player.clubId) {
      throw new CustomBadRequest([PlayerErrors.ALREADY_IN_CLUB]);
    }

    player.joinClub(data);

    return await this.playersRepository.save(player);
  }

  async getAllFromClub(data: {
    name: string;
    take: number;
    skip: number;
    clubId: string;
  }): Promise<Player[]> {
    return await this.playersRepository.find({
      where: {
        clubId: data.clubId,
        name: ILike(`%${data.name}%`),
      },
      take: data.take,
      skip: data.skip,
    });
  }
}
