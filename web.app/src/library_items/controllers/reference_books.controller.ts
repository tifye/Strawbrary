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
import { CreateReferenceBookDto } from '../dto/create_reference_book.dto';
import { UpdateReferenceBookDto } from '../dto/update_reference_book.dto';
import { ReferenceBooksService } from '../services/reference_book.service';

@Controller('referencebooks')
export class ReferenceBooksController {
  constructor(private referenceBooksService: ReferenceBooksService) {}

  @Post()
  async create(@Body() createReferenceBookDto: CreateReferenceBookDto) {
    const result = await this.referenceBooksService.create(
      createReferenceBookDto,
    );
    if (result[1]) {
      throw new InternalServerErrorException();
    }

    return result[0];
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateReferenceBookDto: UpdateReferenceBookDto,
  ) {
    const result = await this.referenceBooksService.update(
      id,
      updateReferenceBookDto,
    );
    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    if (result[0] !== undefined && result[0] == 0) {
      throw new BadRequestException('No refernce book found with given id');
    }

    return {
      wasSuccessful: true,
    };
  }
}
