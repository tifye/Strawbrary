import { Body, Controller, Post } from '@nestjs/common';
import { CreateDvdDto } from '../dto/create_dvd.dto';

@Controller('dvds')
export class DvdsController {
  @Post()
  async create(@Body() createDvdDto: CreateDvdDto) {
    return {
      message: 'Hello World',
    };
  }
}
