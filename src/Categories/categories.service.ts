/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
import { Inject, Injectable } from '@nestjs/common';
import { CategoriesRepository } from './categories.repository';
import { CategoryDTO } from './DTOs/Category.DTO';
import { Category } from './Category.entity';

@Injectable()
export class CategoriesService {
  constructor(@Inject() private categoriesRepository: CategoriesRepository) {}

  async getCategories(): Promise<Category[]> {
    return await this.categoriesRepository.getCategories();
  }

  async addCategories(nameCategory: CategoryDTO): Promise<string> {
    return await this.categoriesRepository.addCategories(nameCategory);
  }
}
