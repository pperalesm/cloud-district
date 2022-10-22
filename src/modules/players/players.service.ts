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
    const currentPlayer = await this.playersRepository.findOne({
      where: { id: data.playerId },
    });

    if (!currentPlayer) {
      throw new CustomNotFound([PlayerErrors.NOT_FOUND]);
    }

    if (currentPlayer.clubId) {
      throw new CustomBadRequest([PlayerErrors.ALREADY_IN_CLUB]);
    }

    const updatedPlayer = new Player();
    updatedPlayer.setId(currentPlayer.id);
    updatedPlayer.joinClub(data);

    return await this.playersRepository.save(updatedPlayer);
  }

  async leaveClub(data: { clubId: string; playerId: string }): Promise<Player> {
    const currentPlayer = await this.playersRepository.findOne({
      where: { id: data.playerId },
    });

    if (!currentPlayer) {
      throw new CustomNotFound([PlayerErrors.NOT_FOUND]);
    }

    if (currentPlayer.clubId !== data.clubId) {
      throw new CustomBadRequest([PlayerErrors.NOT_IN_SPECIFIED_CLUB]);
    }

    const updatedPlayer = new Player();
    updatedPlayer.setId(currentPlayer.id);
    updatedPlayer.leaveClub();

    return await this.playersRepository.save(updatedPlayer);
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
