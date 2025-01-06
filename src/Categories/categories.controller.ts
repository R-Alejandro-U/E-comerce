/* eslint-disable prettier/prettier */
import { Body, Controller, Get, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoryDTO } from './DTOs/Category.DTO';
import { Category } from './Category.entity';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Obtener todas las categorías', 
    description: 'Este endpoint devuelve una lista de todas las categorías disponibles.' 
  })
  @ApiBearerAuth()
  async getCategories(): Promise<Category[]> {
    return this.categoriesService.getCategories();
  }

  @Post('add-category')
  @ApiOperation({ 
    summary: 'Agregar una nueva categoría', 
    description: 'Este endpoint permite agregar una nueva categoría proporcionando un nombre válido.' 
  })
  @ApiBearerAuth()
  async addCategories(@Body() nameCategory: CategoryDTO): Promise<string> {
    return this.categoriesService.addCategories(nameCategory);
  }
}
