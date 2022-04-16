import { Controller, Get, Req, Res, Param, Post, Body } from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateLibraryItemDto } from './dto/create-library_item.dto';

@Controller('items')
export class LibraryItemsController {
  @Get()
  findAll(@Req() req: Request, @Res() res: Response): string {
    console.log(req, res);
    return 'This action returns all items';
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<string> {
    return `This action returns a #${id} item`;
  }

  @Post()
  async create(@Body() createLibraryItemDto: CreateLibraryItemDto) {
    console.log(createLibraryItemDto);
    return 'This action adds a new item';
  }
}
