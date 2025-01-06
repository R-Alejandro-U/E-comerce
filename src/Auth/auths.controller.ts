/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, SetMetadata } from '@nestjs/common';
import { AuthsService } from './auths.service';
import {
  CreateUserDTO,
  UserDTOResponse,
} from 'src/Users/DTOs/Users.DTOs';
import { AuthResponseDTO, LoginDTO } from './DTOs/AuthDTO';
import { ApiOperation } from '@nestjs/swagger';

@Controller('auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signin')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'Iniciar sesión de un usuario', description: 'Este endpoint permite que un usuario inicie sesión proporcionando sus credenciales.' })
  login(@Body() cridentials: LoginDTO): Promise<AuthResponseDTO> {
    return this.authsService.login(cridentials);
  }

  @Post('signup')
  @SetMetadata('isPublic', true)
  @ApiOperation({ summary: 'Registrar un nuevo usuario', description: 'Este endpoint permite registrar un nuevo usuario con la información proporcionada.' })
  async signup(@Body() data: CreateUserDTO): Promise<UserDTOResponse> {
    const { passwordConfirmation, ...user } = data;
    return this.authsService.signup(user);
  }
}
