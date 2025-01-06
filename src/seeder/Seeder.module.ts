/* eslint-disable prettier/prettier */
// src/seeder/seeder.module.ts
import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../Products/Product.entity';
import { Seeder } from './SeederDB.service';
import { Category } from 'src/Categories/Category.entity';
import { UserModule } from 'src/Users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product]), UserModule],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: Seeder) {}
  async onApplicationBootstrap(): Promise<void> {
    await this.seederService.seed();
  }
}
