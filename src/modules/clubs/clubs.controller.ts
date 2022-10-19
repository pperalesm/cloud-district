import { Body, Controller, Param, Patch, Post } from '@nestjs/common';
import { routesV1 } from '../../app.routes';
import { ClubsService } from './clubs.service';
import { BaseClubDto } from './dtos/base-club.dto';
import { CreateClubDto } from './dtos/create-club.dto';
import { UpdateBudgetDto } from './dtos/update-budget.dto';

@Controller(routesV1.clubs.root)
export class ClubsController {
  constructor(private readonly clubsService: ClubsService) {}

  @Post()
  async create(@Body() createClubDto: CreateClubDto): Promise<BaseClubDto> {
    const club = await this.clubsService.create(createClubDto);
    return new BaseClubDto(club);
  }

  @Patch(routesV1.clubs.updateBudget)
  async updateBudget(
    @Param('id') id: string,
    @Body() updateBudgetDto: UpdateBudgetDto,
  ): Promise<BaseClubDto> {
    const club = await this.clubsService.updateBudget(id, updateBudgetDto);
    return new BaseClubDto(club);
  }
}
