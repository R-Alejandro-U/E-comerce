/* eslint-disable prettier/prettier */
// src/seeder/seeder.module.ts

import { Module, OnApplicationBootstrap } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Category } from "src/Categories/Category.entity";
import { Product } from "src/Products/Product.entity";
import { UserModule } from "src/Users/users.module";
import { Seeder } from "./SeederDB.service";


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
