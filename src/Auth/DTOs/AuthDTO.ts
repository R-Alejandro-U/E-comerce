/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty
} from 'class-validator';
import { UserDataDTO } from 'src/Users/DTOs/Users.DTOs';

class LoginDTO {
  @IsNotEmpty({ message: 'El campo email no debe estar vacío.' })
  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser una dirección válida en formato estándar.',
    example: 'example.123@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'El campo contraseña no debe estar vacío.' })
  @ApiProperty({
    description:
      'Contraseña del usuario. Debe ser una contraseña fuerte con un mínimo de 8 caracteres y un máximo de 15. La contraseña debe incluir al menos 1 letra mayúscula, 1 letra minúscula, 1 número y 1 símbolo especial.',
    example: 'Pepe*1234',
  })
  password: string;
}

class AuthResponseDTO {
  @ApiProperty({ description: 'Los datos del usuario' })
  userData: UserDataDTO;

  @ApiProperty({ description: 'El token de autenticación' })
  token: string;
}

export {
  AuthResponseDTO,
  LoginDTO,
}
