import { HttpException, Injectable } from '@nestjs/common';
import { Category } from 'src/Categories/Category.entity';
import { example } from 'src/Products';
import { Product } from 'src/Products/Product.entity';
import { main } from 'src/userMain';
import { User } from 'src/Users/User.entity';
import { UsersRepository } from 'src/Users/users.repository';
import { DataSource } from 'typeorm';

@Injectable()
export class Seeder {
  constructor(
    private readonly dataSource: DataSource,
    private userRepository: UsersRepository,
  ) {}
  async seed() {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    try {
      await queryRunner.startTransaction();
      const uniqueCategories = Array.from(
        new Set(example.map((product) => product.category)),
      );
      const savePromises = uniqueCategories.map(async (category) => {
        const exist = await queryRunner.manager.findOneBy(Category, {
          name: category,
        });
        if (!exist) {
          await queryRunner.manager.save(Category, { name: category });
        }
      });
      await Promise.all(savePromises);
      for (const product of example) {
        const exists: Product | null = await queryRunner.manager.findOneBy(
          Product,
          {
            name: product.name,
          },
        );

        if (!exists) {
          const category: Category | null = await queryRunner.manager.findOneBy(
            Category,
            {
              name: product.category,
            },
          );

          if (category) {
            await queryRunner.manager.save(Product, {
              ...product,
              category: category,
            });
          }
        }
      }

      const exist: User | null = await this.userRepository.getIdByEmail(
        main.email,
      );
      const passwordHash: string = await this.userRepository.hashPassword(
        main.password,
      );
      if (!exist)
        this.dataSource.manager.save(User, { ...main, password: passwordHash });

      await queryRunner.commitTransaction();
      console.log('Base de datos precargada con éxito.');
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.error('Error durante la precarga de la base de datos:', error);
      throw new HttpException(
        `Error durante la precarga de la base de datos: ${error}`,
        500,
      );
    } finally {
      await queryRunner.release();
      console.log('Termino el proceso de precargado.');
    }
  }
}
