import { Body, Controller, Post } from '@nestjs/common';
import { routesV1 } from '../../app.routes';
import { BasePlayerDto } from './dtos/base-player.dto';
import { CreatePlayerDto } from './dtos/create-player.dto';
import { PlayersService } from './players.service';

@Controller(routesV1.players.root)
export class PlayersController {
  constructor(private readonly playersService: PlayersService) {}

  @Post()
  async create(
    @Body() createPlayerDto: CreatePlayerDto,
  ): Promise<BasePlayerDto> {
    const player = await this.playersService.create(createPlayerDto);

    return new BasePlayerDto(player);
  }
}
