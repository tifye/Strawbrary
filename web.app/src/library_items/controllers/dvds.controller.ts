import { Controller, Post } from '@nestjs/common';

@Controller('dvds')
export class DvdsController {
  @Post()
  async create() {
    return {
      message: 'Hello World',
    };
  }
}
