import { Body, Controller, Post } from '@nestjs/common';
import { CreateDvdDto } from '../dto/create_dvd.dto';
import { DvdsService } from '../services/dvds.service';

@Controller('dvds')
export class DvdsController {
  constructor(private dvdsService: DvdsService) {}

  @Post()
  async create(@Body() createDvdDto: CreateDvdDto) {
    return {
      message: 'Hello World',
    };
  }
}
