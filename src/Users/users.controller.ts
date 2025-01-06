/* eslint-disable prettier/prettier */
import {
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
  UserDTOResponse,
  UserDTOResponse3,
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
  description: 'Este endpoint permite obtener todos los usuarios con paginación. El número de página y el límite de usuarios por página pueden ser configurados mediante parámetros de consulta.',
})
@ApiBearerAuth()
async getAllUsers(
  @Query('page') page: number = 1,
  @Query('limit') limit: number = 5,
): Promise<GetUserDTOResponse> {
  if(isNaN(page) || page <= 0) page = 1
  if(isNaN(limit) || limit <= 0) limit = 5
  return this.usersService.getAllUsers(page, limit);
}

@Get(':id')
@ApiOperation({
  summary: 'Obtener usuario por ID',
  description: 'Este endpoint permite obtener los detalles de un usuario específico utilizando su ID. El ID debe ser un UUID válido.',
})
@ApiBearerAuth()
async getUserById(
  @Param('id', ParseUUIDPipe) id: string,
): Promise<UserDTOResponse3> {
  return this.usersService.getUserById(id);
}

@Delete(':id')
@ApiOperation({
  summary: 'Eliminar usuario por ID',
  description: 'Este endpoint permite eliminar un usuario específico utilizando su ID. El ID debe ser un UUID válido.',
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
  description: 'Este endpoint permite editar los detalles de un usuario específico utilizando su ID. El ID debe ser un UUID válido y el cuerpo de la solicitud debe contener los datos actualizados del usuario. Este campo tambien permite otorgarle a otro usuario, el rol de administrador, solo si el usuario que hace la petición es un usuario administrador.Es decir, un aministrador puede volver a otro usuario administrador, más no un usuario puedo darse el rol a si mismo de administrador.',
})
@ApiResponse({
  type: IdDTO,
})
@ApiBearerAuth()
async editUser(
  @Param('id', ParseUUIDPipe) id: string,
  @Body() user: UserUpdateDTO,
): Promise<string> {
  return this.usersService.editUser(id, user);
}

}
