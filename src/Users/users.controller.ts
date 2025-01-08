/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import {
  GetUserDTOResponse,
  UserDTOResponse3,
  UserDTOResponse4,
  UserUpdateDTO,
} from './DTOs/Users.DTOs';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/utils/Roles.enum';
import { RolesGuard } from 'src/Auth/guard/roles.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdDTO } from 'src/utils/GlobalDTO/Global.DTO';
@Controller('users')
export class UserController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @Roles(Role.admin)
  @UseGuards(RolesGuard)
  @UsePipes(new ValidationPipe({ transform: true }))
  @ApiOperation({
    summary: 'Obtener todos los usuarios',
    description:
      'Este endpoint permite obtener todos los usuarios con paginación. El número de página y el límite de usuarios por página pueden ser configurados mediante parámetros de consulta.',
  })
  @ApiBearerAuth()
  async getAllUsers(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 5,
  ): Promise<GetUserDTOResponse> {
    if (isNaN(page) || page <= 0) page = 1;
    if (isNaN(limit) || limit <= 0) limit = 5;
    return this.usersService.getAllUsers(page, limit);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener usuario por ID',
    description:
      'Este endpoint permite obtener los detalles de un usuario específico utilizando su ID. El ID debe ser un UUID válido.',
  })
  @ApiBearerAuth()
  async getUserById(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<UserDTOResponse4> {
    console.log(id);
    
    return this.usersService.getUserById(id);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar usuario por ID',
    description:
      'Este endpoint permite eliminar un usuario específico utilizando su ID. El ID debe ser un UUID válido.',
  })
  @ApiResponse({
    type: IdDTO,
  })
  @ApiBearerAuth()
  async deleteUser(@Param('id', ParseUUIDPipe) id: string): Promise<string> {
    return this.usersService.deleteUser(id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Editar usuario por ID',
    description:
      'Este endpoint permite editar los detalles de un usuario específico utilizando su ID. El ID debe ser un UUID válido y el cuerpo de la solicitud debe contener los datos actualizados del usuario.',
  })
  @ApiResponse({
    type: IdDTO,
  })
  @ApiBearerAuth()
  async editUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() user: Partial<UserUpdateDTO>,
  ): Promise<string> {
    if(!Object.keys(user).length) throw new BadRequestException('Debe haber al menos una propiedad para poder editar al usuario.')
    return this.usersService.editUser(id, user);
  }
}
