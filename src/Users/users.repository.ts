/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UserDTO, UserDTOResponse, UserUpdateDTO } from './DTOs/Users.DTOs';
import * as bcrypt from 'bcrypt';
import { SALT } from 'src/config/envs';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Users/User.entity';
import { Repository } from 'typeorm';
import { main } from 'src/userMain';

@Injectable()
export class UsersRepository {
  
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async getUsers(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw error;
    }
  }

  async getUserById(id: string): Promise<User> {
    try {
      const user: User | null = await this.userRepository.findOne({
        where: { id },
        relations: ['orders'],
      });

      if (!user)
        throw new NotFoundException(
          `El usuario buscado con el id "${id}" no existe.`,
        );

      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async getIdByEmail(email: string): Promise<User | null> {
    try {
      const user: User | null = await this.userRepository.findOneBy({ email });
      return user;
    } catch (error) {
      throw error;
    }
  }

  async hashPassword(password: string): Promise<string> {
    try {
      if (typeof SALT !== 'number' || isNaN(SALT)) {
        throw new HttpException(
          {
            message: `El SALT es invalido por favor ingrese un numero valido que no sea negatico.`,
            status: 400,
          },
          400,
        );
      }
      const salt: string = await bcrypt.genSalt(SALT);
      return await bcrypt.hash(password, salt);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Hubo un error desconocido.';
      console.error('Hubo un problema en la incriptación:', errorMessage);
      throw error;
    }
  }

  async registerUser(data: UserDTO): Promise<UserDTOResponse> {
    try {
      const encripted: string = await this.hashPassword(data.password);
      const newUser: UserDTO = {
        ...data,
        password: encripted,
      };
      const user: User = this.userRepository.create(newUser);
      await this.userRepository.save(user);
      const { password, isAdmin, createUser, updateUser, ...userPartial } =
        user;
      return userPartial;
    } catch (error) {
      throw new HttpException({ message: error.detail, status: 409 }, 409);
    }
  }

  async deleteUser(id: string): Promise<string> {
    try {
      const userMain: User | null = await this.getIdByEmail(main.email);
      if (id === userMain.id)
        throw new BadRequestException(
          'No puedes eliminar al usuario main, por defecto.',
        );
      await this.userRepository.delete({ id });
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async editUser(id: string, user: Partial<UserUpdateDTO>): Promise<string> {
    try {
      const oldUser: User | null = await this.userRepository.findOneBy({ id });
      if (!oldUser)
        throw new BadRequestException('Hubo un error al encontrar al usuario.');
      const userMain: User | null = await this.userRepository.findOneBy({
        name: main.name,
      });
      if (oldUser.id === userMain?.id)
        throw new BadRequestException(
          'El usuario precargado main no puede ser modificado.',
        );
      if (user.password) user.password = await this.hashPassword(user.password);
      const updateUser: Partial<User> = {
        ...oldUser,
        ...user,
      };
      await this.userRepository.save(updateUser);
      return id;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async AssignAdmin(id: string, boolean: boolean): Promise<string> {
    const user: User | null = await this.getUserById(id);
    if(boolean === user.isAdmin) throw new BadRequestException(`El usuario ya es ${boolean ? "administrador." : "un usuario corriente."}`);
    await this.userRepository.save({...user, isAdmin: boolean});
    return boolean ? `El usuario ${user.name}, ya es administrador.` : `El usuario ${user.name}, ya no es administrador.`
  }
}
