import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { routesV1 } from '../../app.routes';
import { BaseCoachDto } from '../coaches/dtos/base-coach.dto';
import { BasePlayerDto } from '../players/dtos/base-player.dto';
import { ClubsService } from './clubs.service';
import { BaseClubDto } from './dtos/base-club.dto';
import { CreateClubDto } from './dtos/create-club.dto';
import { GetPlayersDto } from './dtos/get-players.dto';
import { RegisterCoachDto } from './dtos/register-coach.dto';
import { RegisterPlayerDto } from './dtos/register-player.dto';
import { UpdateClubDto } from './dtos/update-club.dto';

@Controller(routesV1.clubs.root)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  async create(@Body() createClubDto: CreateClubDto): Promise<BaseClubDto> {
    const club = await this.clubsService.create(createClubDto);

    return new BaseClubDto(club);
  }

  @Patch(routesV1.clubs.update)
  async update(
    @Param(routesV1.clubs.updateIdParam1) clubId: string,
    @Body() updateClubDto: UpdateClubDto,
  ): Promise<BaseClubDto> {
    const club = await this.clubsService.update({
      ...updateClubDto,
      clubId: clubId,
    });

    return new BaseClubDto(club);
  }

  @Post(routesV1.clubs.registerPlayer)
  async registerPlayer(
    @Param(routesV1.clubs.registerPlayerIdParam1) clubId: string,
    @Body() registerPlayerDto: RegisterPlayerDto,
  ): Promise<BasePlayerDto> {
    const player = await this.clubsService.registerPlayer({
      ...registerPlayerDto,
      clubId: clubId,
    });

    return new BasePlayerDto(player);
  }

  @Post(routesV1.clubs.registerCoach)
  async registerCoach(
    @Param(routesV1.clubs.registerCoachIdParam1) clubId: string,
    @Body() registerCoachDto: RegisterCoachDto,
  ): Promise<BaseCoachDto> {
    const coach = await this.clubsService.registerCoach({
      ...registerCoachDto,
      clubId: clubId,
    });

    return new BaseCoachDto(coach);
  }

  @Delete(routesV1.clubs.dropPlayer)
  async dropPlayer(
    @Param(routesV1.clubs.dropPlayerIdParam1) clubId: string,
    @Param(routesV1.clubs.dropPlayerIdParam2) playerId: string,
  ): Promise<BasePlayerDto> {
    const player = await this.clubsService.dropPlayer({
      clubId: clubId,
      playerId: playerId,
    });

    return new BasePlayerDto(player);
  }

  @Delete(routesV1.clubs.dropCoach)
  async dropCoach(
    @Param(routesV1.clubs.dropCoachIdParam1) clubId: string,
    @Param(routesV1.clubs.dropCoachIdParam2) coachId: string,
  ): Promise<BasePlayerDto> {
    const coach = await this.clubsService.dropCoach({
      clubId: clubId,
      coachId: coachId,
    });

    return new BaseCoachDto(coach);
  }

  @Get(routesV1.clubs.getPlayers)
  async getPlayers(
    @Param(routesV1.clubs.getPlayersIdParam1) clubId: string,
    @Query() getPlayersDto: GetPlayersDto,
  ): Promise<BasePlayerDto[]> {
    const players = await this.clubsService.getPlayers({
      ...getPlayersDto,
      clubId: clubId,
    });

    return players.map((player) => new BasePlayerDto(player));
  }
}
