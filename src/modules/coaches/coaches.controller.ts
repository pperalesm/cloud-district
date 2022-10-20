import { Body, Controller, Post } from '@nestjs/common';
import { routesV1 } from '../../app.routes';
import { CoachesService } from './coaches.service';
import { BaseCoachDto } from './dtos/base-coach.dto';
import { CreateCoachDto } from './dtos/create-coach.dto';

@Controller(routesV1.coaches.root)
export class CoachesController {
  constructor(private readonly coachesService: CoachesService) {}

  @Post()
  async create(@Body() createCoachDto: CreateCoachDto): Promise<BaseCoachDto> {
    const coach = await this.coachesService.create(createCoachDto);

    return new BaseCoachDto(coach);
  }
}
