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
import { CreateAudioBookDto } from '../dto/create_audio_book.dto';
import { UpdateAudioBookDto } from '../dto/update_audio_book.dto';
import { AudioBookService } from '../services/audio_book.service';

@Controller('books/audio')
export class AudioBookController {
  constructor(private audioBookService: AudioBookService) {}

  @Post()
  async create(@Body() createAudioBookDto: CreateAudioBookDto) {
    const result = await this.audioBookService.create(createAudioBookDto);
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    return result[0];
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAudioBookDto: UpdateAudioBookDto,
  ) {
    const result = await this.audioBookService.update(id, updateAudioBookDto);
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    if (result[0] !== undefined && result[0] == 0) {
      throw new BadRequestException('No audio book found with given id');
    }

    return {
      wasSuccessful: true,
    };
  }
}
