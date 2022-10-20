import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomBadRequest } from '../../shared/exceptions/custom-bad-request';
import { CustomConflict } from '../../shared/exceptions/custom-conflict';
import { CustomNotFound } from '../../shared/exceptions/custom-not-found';
import { RegisterPlayerDto } from '../clubs/dtos/register-player.dto';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { Player } from './player.entity';
import { PlayerErrors } from './player.errors';

@Injectable()
export class PlayersService {
  constructor(
    @InjectRepository(Player)
    private readonly playersRepository: Repository<Player>,
  ) {}

  async create(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const conflictedPlayer = await this.playersRepository.findOne({
      where: { email: createPlayerDto.email },
    });

    if (conflictedPlayer) {
      throw new CustomConflict([PlayerErrors.EMAIL_UNIQUE]);
    }

    const newPlayer = Player.create(createPlayerDto);

    return await this.playersRepository.save(newPlayer);
  }

  async joinClub(
    registerPlayerDto: RegisterPlayerDto,
    clubId: string,
  ): Promise<Player> {
    const player = await this.playersRepository.findOne({
      where: { id: registerPlayerDto.id },
    });

    if (!player) {
      throw new CustomNotFound([PlayerErrors.NOT_FOUND]);
    }

    if (player.clubId) {
      throw new CustomBadRequest([PlayerErrors.ALREADY_IN_CLUB]);
    }

    player.joinClub(clubId, registerPlayerDto.salary);

    return await this.playersRepository.save(player);
  }
}
