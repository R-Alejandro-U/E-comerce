import { Module, OnApplicationBootstrap } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/Categories/Category.entity';
import { Product } from 'src/Products/Product.entity';
import { UserModule } from 'src/Users/users.module';
import { Seeder } from './SeederDb.service';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Product]), UserModule],
  providers: [Seeder],
  exports: [Seeder],
})
export class SeederDbModule implements OnApplicationBootstrap {
  constructor(private readonly seederService: Seeder) {}
  async onApplicationBootstrap(): Promise<void> {
    await this.seederService.seed();
  }
}
