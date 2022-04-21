import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateAudioBookDto } from '../dto/create_audio_book.dto';
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
}
