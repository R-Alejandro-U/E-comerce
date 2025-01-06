/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CategoryDTO } from './DTOs/Category.DTO';
import { Category } from './Category.entity';

@Injectable()
export class CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private categoriesRepository: Repository<Category>,
  ) {}

  async getCategories(): Promise<Category[]> {
    try {
      return await this.categoriesRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async addCategories(nameCategory: CategoryDTO): Promise<string> {
    try {
      const newCategory: Category =
        this.categoriesRepository.create(nameCategory);
      await this.categoriesRepository.save(newCategory);
      return `Se creo la categoria ${nameCategory.name} con exitos.`;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
