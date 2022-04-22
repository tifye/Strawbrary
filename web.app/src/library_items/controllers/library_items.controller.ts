import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { LibraryItem } from '@prisma/client';
import { CheckInItemDto } from '../dto/check_in_item.dto';
import { LibraryItemType } from '../enums/library_item_type.enum';
import { ItemCanCheckOutRule } from '../pipes/item_can_check_out.rule';
import { ParseItemPipe } from '../pipes/parse_item.pipe';
import { ValidItemTypePipe } from '../pipes/valid_item_type.pipe';
import { LibraryItemsService } from '../services/library_items.service';

@Controller('items')
export class LibraryItemsController {
  constructor(private libraryItemsService: LibraryItemsService) {}

  @Get()
  async findAll(): Promise<LibraryItem[]> {
    return this.libraryItemsService.findAll();
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe, ParseItemPipe) item: LibraryItem) {
    const result = await this.libraryItemsService.delete(item.id);

    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    return true;
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe, ParseItemPipe) item: LibraryItem,
  ): Promise<LibraryItem> {
    return item;
  }

  @Post('checkout/:id')
  async checkOut(
    @Param('id', ParseIntPipe, ParseItemPipe, ItemCanCheckOutRule)
    item: LibraryItem,
    @Body() { borrower }: CheckInItemDto,
  ) {
    const result = await this.libraryItemsService.checkOut(item, borrower);

    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    return result[0];
  }

  @Post('checkin/:id')
  async checkIn(@Param('id', ParseIntPipe, ParseItemPipe) item: LibraryItem) {
    const result = await this.libraryItemsService.checkIn(item);

    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    return result[0];
  }

  @Post(':id/type')
  async changeItemType(
    @Param('id', ParseIntPipe, ParseItemPipe) item: LibraryItem,
    @Body('type', ValidItemTypePipe) type: LibraryItemType,
  ) {
    const result = await this.libraryItemsService.changeItemType(item, type);
    if (result[1]) {
      throw new InternalServerErrorException(result[1]);
    }

    return result[0];
  }
}
