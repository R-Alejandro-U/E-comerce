/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Body, Controller, Param, ParseUUIDPipe, Post, Put, SetMetadata, UseGuards } from '@nestjs/common';
import { AuthsService } from './auths.service';
import { CreateUserDTO, UserDTOResponse } from 'src/Users/DTOs/Users.DTOs';
import { AssignAdminDTO, AuthResponseDTO, LoginDTO } from './DTOs/AuthDTO';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Roles } from 'src/decorators/role.decorator';
import { RolesGuard } from './guard/roles.guard';
import { Role } from 'src/utils/Roles.enum';

@Controller('auth')
export class AuthsController {
  constructor(private readonly authsService: AuthsService) {}

  @Post('signin')
  @SetMetadata('isPublic', true)
  @ApiOperation({
    summary: 'Iniciar sesión de un usuario',
    description:
      'Este endpoint permite que un usuario inicie sesión proporcionando sus credenciales.',
  })
  login(@Body() cridentials: LoginDTO): Promise<AuthResponseDTO> {
    return this.authsService.login(cridentials);
  }

  @Post('signup')
  @SetMetadata('isPublic', true)
  @ApiOperation({
    summary: 'Registrar un nuevo usuario',
    description:
      'Este endpoint permite registrar un nuevo usuario con la información proporcionada.',
  })
  async signup(@Body() data: CreateUserDTO): Promise<UserDTOResponse> {
    const { passwordConfirmation, ...user } = data;
    return this.authsService.signup(user);
  }

  @Put(':id')
  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @ApiOperation({
    summary: 'Dar o quitar el rol de admin.',
    description: 'Este endpoint permite darle rol de administrador, a un usuario o quitar se los.'
  })
  @ApiBearerAuth()
  async AssignAdmin(@Param('id', ParseUUIDPipe) id: string, @Body() data: AssignAdminDTO) : Promise<string> {
    return await this.authsService.AssignAdmin(id, data)
  }
}
