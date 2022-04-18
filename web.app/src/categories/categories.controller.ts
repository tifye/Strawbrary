import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { NotReferencedByAnyRule } from './rules/not_referenced_by_any.rule';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const result = await this.categoriesService.create(createCategoryDto);
    if (result[1]) {
      throw new Error(result[1]);
    }

    return result[0];
  }

  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    const result = await this.categoriesService.findOne(id);
    if (result[1]) {
      throw new Error(result[1]);
    }
    return result[0];
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const result = await this.categoriesService.update(id, updateCategoryDto);
    if (result[1]) {
      throw new Error(result[1]);
    }

    return result[0];
  }

  @Delete(':id')
  remove(@Param('id', NotReferencedByAnyRule) id: string) {
    return this.categoriesService.remove(+id);
  }
}
