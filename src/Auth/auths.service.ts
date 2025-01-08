/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { LoginDTO, AuthResponseDTO, AssignAdminDTO } from './DTOs/AuthDTO';
import { UsersRepository } from 'src/Users/users.repository';
import * as bcrypt from 'bcrypt';
import { User } from 'src/Users/User.entity';
import { NotFoundError } from 'rxjs';
import { UserDTO, UserDTOResponse } from 'src/Users/DTOs/Users.DTOs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthsService {
  constructor(
    private usersRepository: UsersRepository,
    private readonly jwtServise: JwtService,
  ) {}

  async login(cridentials: LoginDTO): Promise<AuthResponseDTO> {
    try {
      const validate: User = await this.validate(cridentials);
      const payload: object = {
        sub: validate.id,
        id: validate.id,
        email: validate.email,
        isAdmin: validate.isAdmin,
      };
      const token: string = this.jwtServise.sign(payload);
      return {
        userData: {
          id: validate.id,
          name: validate.name,
          mail: validate.email,
          address: validate.address,
          city: validate.city,
          country: validate.country,
          phone: validate.phone,
        },
        token,
      };
    } catch (error) {
      throw new BadRequestException(
        `Correo electronico o contraseña incorrecta.`,
      );
    }
  }

  async validate({ email, password }: LoginDTO): Promise<User> {
    try {
      const user: User | null = await this.usersRepository.getIdByEmail(email);
      if (!user || !(await bcrypt.compare(password, user.password)))
        throw new NotFoundError(`Correo electronico o contraseña incorrecta.`);
      return user;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async signup(data: UserDTO): Promise<UserDTOResponse> {
    return await this.usersRepository.registerUser(data);
  }
  
  async AssignAdmin(id: string, data: AssignAdminDTO): Promise<string> {
    return await this.usersRepository.AssignAdmin(id, data);
  }
}
