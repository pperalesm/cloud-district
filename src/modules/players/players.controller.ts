import { Body, Controller, Post } from '@nestjs/common';
import { routesV1 } from '../../app.routes';
import { CreatePlayerDto } from './create-player.dto';

@Controller(routesV1.players.root)
export class PlayersController {
  constructor() {
    return;
  }

  @Post()
  async create(@Body() createPlayerDto: CreatePlayerDto) {
    return;
  }
}
