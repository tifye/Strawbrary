import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateDvdDto } from '../dto/create_dvd.dto';
import { UpdateDvdDto } from '../dto/update_dvd.dto';
import { DvdsService } from '../services/dvds.service';

@Controller('dvds')
export class DvdsController {
  constructor(private dvdsService: DvdsService) {}

  @Post()
  async create(@Body() createDvdDto: CreateDvdDto) {
    const result = await this.dvdsService.create(createDvdDto);
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    return result[0];
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateDvdDto: UpdateDvdDto,
  ) {
    const result = await this.dvdsService.update(id, updateDvdDto);
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    if (result[0] !== undefined && result[0] == 0) {
      throw new BadRequestException('No dvd found with given id');
    }

    return {
      wasSuccessful: true,
    };
  }
}
