import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomConflict } from '../../shared/exceptions/custom-conflict';
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

  async joinClub(createPlayerDto: CreatePlayerDto): Promise<Player> {
    const player = Player.create(createPlayerDto);
    return await this.playersRepository.save(player);
  }
}
