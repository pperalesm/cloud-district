import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import {
  NotificationsService,
  NOTIFICATIONS_SERVICE_TOKEN,
} from '../../shared/abstractions/notifications-service.interface';
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
    @Inject(NOTIFICATIONS_SERVICE_TOKEN)
    private readonly notificationsService: NotificationsService,
  ) {}

  async create(data: {
    name: string;
    email: string;
    language: string;
  }): Promise<Player> {
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
    clubName: string;
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

    let updatedPlayer = new Player();
    updatedPlayer.setId(currentPlayer.id);
    updatedPlayer.joinClub(data);

    updatedPlayer = await this.playersRepository.save(updatedPlayer);

    this.notificationsService.sendRegisteredToClub({
      employee: currentPlayer,
      clubName: data.clubName,
    });

    return updatedPlayer;
  }

  async leaveClub(data: {
    clubId: string;
    playerId: string;
    clubName: string;
  }): Promise<Player> {
    const currentPlayer = await this.playersRepository.findOne({
      where: { id: data.playerId },
    });

    if (!currentPlayer) {
      throw new CustomNotFound([PlayerErrors.NOT_FOUND]);
    }

    if (currentPlayer.clubId !== data.clubId) {
      throw new CustomBadRequest([PlayerErrors.NOT_IN_SPECIFIED_CLUB]);
    }

    let updatedPlayer = new Player();
    updatedPlayer.setId(currentPlayer.id);
    updatedPlayer.leaveClub();

    updatedPlayer = await this.playersRepository.save(updatedPlayer);

    this.notificationsService.sendDroppedFromClub({
      employee: currentPlayer,
      clubName: data.clubName,
    });

    return updatedPlayer;
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
