import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateDvdDto } from '../dto/create_dvd.dto';
import { DvdsService } from '../services/dvds.service';

@Controller('dvds')
export class DvdsController {
  constructor(private dvdsService: DvdsService) {}

  @Post()
  async create(@Body() createDvdDto: CreateDvdDto) {
    const result = await this.dvdsService.create(createDvdDto);
    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    return result[0];
  }
}
