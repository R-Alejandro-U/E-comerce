/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CategoryDTO {
  @IsNotEmpty({ message: 'Es obligatorio el nombre de la categoría.' })
  @IsString({ message: 'Debe ser un texto.' })
  @MinLength(2, { message: 'Debe tener al menos 2 letras.' })
  @MaxLength(50, { message: 'El máximo de caracteres es de 50.' })
  @ApiProperty({
    description:
      'Debe contener el nombre de la categoría, con un mínimo de 2 caracteres y un máximo de 50.',
    example: 'Pc',
  })
  name: string;
}
