/* eslint-disable prettier/prettier */
import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsEmpty,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
  ValidateIf,
} from 'class-validator';
import { Order } from 'src/Orders/Order.entity';
import { Confirmation } from 'src/utils/passwordConfimation.pipe';

class CreateUserDTO {
  @IsNotEmpty({ message: 'El campo email no debe estar vacío.' })
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @ApiProperty({
    description: 'Debe contener un email valido',
    example: 'example.123@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres.' })
  @ApiProperty({
    description:
      'Debe contener un nombre, con un minimo de 3 caracteres y un maximo de 80',
    example: 'pepe',
  })
  name: string;

  @IsNotEmpty({ message: 'El campo contraseña no debe estar vacío.' })
  @MaxLength(15, {
    message: 'La contraseña no debe tener más de 15 caracteres.',
  })
  @IsStrongPassword(
    { minLength: 8 },
    {
      message:
        'La contraseña debe incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.',
    },
  )
  @ApiProperty({
    description:
      'Debe contener una contraseña fuerte, con un minimo de 8 caracteres y un maximo de 15. La contraseña debe incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.',
    example: 'Pepe*1234',
  })
  password: string;

  @IsNotEmpty({
    message: 'El campo confirmación de contraseña no debe estar vacío.',
  })
  @Validate(Confirmation, ['password'])
  @ApiProperty({
    description: 'Debe contener la misma contraseña que el input contraseña',
    example: 'Pepe*1234',
  })
  passwordConfirmation: string;

  @IsNotEmpty({ message: 'El campo dirección no debe estar vacío.' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'La dirección no debe exceder los 80 caracteres.' })
  @ApiProperty({
    description:
      'Debe contener una dirección, con un minimo de 3 caracteres y un maximo de 80',
    example: 'Av. pepe 12345',
  })
  address: string;

  @IsNotEmpty({ message: 'El campo teléfono no debe estar vacío.' })
  @IsPhoneNumber(undefined, {
    message:
      'El número de teléfono debe tener un formato válido internacional. Ejemplo: "+541123456789".',
  })
  @ApiProperty({
    description:
      'Debe contener un numero de telefono valido con el codigo regional del pais',
    example: '+541123456789',
  })
  phone: string;

  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres.' })
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @ApiProperty({
    description:
      'Este campo es opcional, si se agrega debe contener un pais con un maximo de 20 caractres y un minimo de 5',
    example: 'Venezuela',
    default: undefined,
  })
  country?: string;

  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no debe exceder los 20 caracteres.' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @ApiProperty({
    description:
      'Este campo es opcional, si se agrega debe contener una ciudad con un maximo de 20 caractres y un minimo de 5',
    example: 'Maracaibo',
    default: undefined,
  })
  city?: string;

  @IsEmpty({ message: 'Este campo no puedo ser recibido por parametro.' })
  @ApiProperty({
    description: 'Este campo no es requerido, y por defecto es falso',
    default: false,
    readOnly: true,
  })
  isAdmin?: boolean;
}

class UserDTO {
  @IsNotEmpty({ message: 'El campo email no debe estar vacío.' })
  @IsEmail({}, { message: 'El email debe tener un formato válido.' })
  @ApiProperty({
    description: 'Debe contener un email valido',
    example: 'example.123@gmail.com',
  })
  email: string;

  @IsNotEmpty({ message: 'El campo nombre no debe estar vacío.' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres.' })
  @ApiProperty({
    description:
      'Debe contener un nombre, con un minimo de 3 caracteres y un maximo de 80',
    example: 'pepe',
  })
  name: string;

  @IsNotEmpty({ message: 'El campo contraseña no debe estar vacío.' })
  @MaxLength(15, {
    message: 'La contraseña no debe tener más de 15 caracteres.',
  })
  @IsStrongPassword(
    { minLength: 8 },
    {
      message:
        'La contraseña debe incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.',
    },
  )
  @ApiProperty({
    description:
      'Debe contener una contraseña fuerte, con un minimo de 8 caracteres y un maximo de 15. La contraseña debe incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.',
    example: 'Pepe*1234',
  })
  password: string;

  @IsNotEmpty({ message: 'El campo dirección no debe estar vacío.' })
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'La dirección no debe exceder los 80 caracteres.' })
  @ApiProperty({
    description:
      'Debe contener una dirección, con un minimo de 3 caracteres y un maximo de 80',
    example: 'Av. pepe 12345',
  })
  address: string;

  @IsNotEmpty({ message: 'El campo teléfono no debe estar vacío.' })
  @IsPhoneNumber(undefined, {
    message:
      'El número de teléfono debe tener un formato válido internacional. Ejemplo: "+541123456789".',
  })
  @ApiProperty({
    description:
      'Debe contener un numero de telefono valido con el codigo regional del pais',
    example: '+541123456789',
  })
  phone: string;

  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres.' })
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @ApiProperty({
    description:
      'Este campo es opcional, si se agrega debe contener un pais con un maximo de 20 caractres y un minimo de 5',
    example: 'Venezuela',
    default: undefined,
  })
  country?: string;

  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no debe exceder los 20 caracteres.' })
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @ApiProperty({
    description:
      'Este campo es opcional, si se agrega debe contener una ciudad con un maximo de 20 caractres y un minimo de 5',
    example: 'Maracaibo',
    default: undefined,
  })
  city?: string;

  @IsEmpty({ message: 'Este campo no puedo ser recibido por parametro.' })
  @ApiProperty({
    description: 'Este campo no es requerido, y por defecto es falso',
    default: false,
    readOnly: true,
  })
  isAdmin?: boolean;
}

class UserOrderDTO {
  @ApiProperty({
    description: 'Identificador único del usuario en formato UUID',
  })
  id: string;

  @ApiProperty({
    description: 'Nombre del usuario',
  })
  name: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario',
  })
  email: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario',
  })
  phone: string;

  @ApiProperty({
    description: 'País de residencia del usuario',
  })
  country: string;

  @ApiProperty({
    description: 'Dirección residencial del usuario',
  })
  address: string;

  @ApiProperty({
    description: 'Ciudad donde reside el usuario',
  })
  city: string;
}

class UserDTOResponse {
  @ApiProperty({
    description: 'Identificador único del usuario.',
    example: 'c1f3421a-4f57-11ed-b878-0242ac120002',
  })
  id: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser único.',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario.',
    example: 'Juan Pérez',
  })
  name: string;

  @ApiProperty({
    description: 'Dirección del usuario.',
    example: 'Calle Falsa 123, Piso 4, Departamento B.',
  })
  address: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario.',
    example: '+1 555-123-4567',
  })
  phone: string;

  @ApiProperty({
    description: 'País de residencia del usuario. Campo opcional.',
    example: 'México',
    required: false,
  })
  country?: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario. Campo opcional.',
    example: 'Ciudad de México',
    required: false,
  })
  city?: string;

  @ApiProperty({ description: 'Lista de Ordenes del usuario.' })
  orders?: Order[];
}

class UserDTOResponse2 {
  @ApiProperty({
    description: 'Identificador único del usuario.',
    example: 'c1f3421a-4f57-11ed-b878-0242ac120002',
  })
  id: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser único.',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario.',
    example: 'Juan Pérez',
  })
  name: string;

  @ApiProperty({
    description: 'Dirección del usuario.',
    example: 'Calle Falsa 123, Piso 4, Departamento B.',
  })
  address: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario.',
    example: '+1 555-123-4567',
  })
  phone: string;

  @ApiProperty({
    description: 'País de residencia del usuario. Campo opcional.',
    example: 'México',
  })
  country?: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario. Campo opcional.',
    example: 'Ciudad de México',
  })
  city?: string;

  @ApiProperty({
    description:
      'Indica si el usuario tiene permisos de administrador. Este campo no es aceptado. Por defecto es false.',
    example: false,
    default: false,
    readOnly: true,
  })
  isAdmin?: boolean;
}

class UserDTOResponse3 {
  @ApiProperty({
    description: 'Identificador único del usuario.',
    example: 'c1f3421a-4f57-11ed-b878-0242ac120002',
  })
  id: string;

  @ApiProperty({
    description: 'Correo electrónico del usuario. Debe ser único.',
    example: 'user@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'Nombre completo del usuario.',
    example: 'Juan Pérez',
  })
  name: string;

  @ApiProperty({
    description: 'Dirección del usuario.',
    example: 'Calle Falsa 123, Piso 4, Departamento B.',
  })
  address: string;

  @ApiProperty({
    description: 'Número de teléfono del usuario.',
    example: '+1 555-123-4567',
  })
  phone: string;

  @ApiProperty({
    description: 'País de residencia del usuario. Campo opcional.',
    example: 'México',
    required: false,
  })
  country?: string;

  @ApiProperty({
    description: 'Ciudad de residencia del usuario. Campo opcional.',
    example: 'Ciudad de México',
    required: false,
  })
  city?: string;

  @ApiProperty({
    description: 'Lista de Ordenes del usuario.',
    type: [UserOrderDTO],
  })
  orders?: UserOrderDTO[];
}

class DataPage {
  @ApiProperty({
    description: 'Número total de elementos disponibles.',
    example: 100,
  })
  totalItems: number;

  @ApiProperty({
    description: 'Número máximo de páginas disponibles.',
    example: 10,
  })
  maxPages: number;

  @ApiProperty({
    description: 'Número de la página actual.',
    example: 2,
  })
  page: number;

  @ApiProperty({
    description: 'Cantidad de elementos en la página actual.',
    example: 10,
  })
  currentItems: number;
}

class GetUserDTOResponse {
  @ApiProperty({
    description: 'Información de la paginación.',
    type: DataPage,
  })
  dataPage: DataPage;

  @ApiProperty({
    description: 'Lista de usuarios pertenecientes a la página actual.',
    type: [UserDTOResponse2],
  })
  users: UserDTOResponse2[];
}

class UserDataDTO {
  @ApiProperty({ description: 'El ID del usuario' })
  id: string;

  @ApiProperty({ description: 'El nombre del usuario' })
  name: string;

  @ApiProperty({ description: 'El correo electrónico del usuario' })
  mail: string;

  @ApiProperty({ description: 'La dirección del usuario' })
  address: string;

  @ApiProperty({ description: 'La ciudad del usuario' })
  city: string;

  @ApiProperty({ description: 'El país del usuario' })
  country: string;

  @ApiProperty({ description: 'El teléfono del usuario' })
  phone: string;
}

class UserUpdateDTO {
  @IsEmpty({
    message: 'No se puede modificar el identificador único del usuario.',
  })
  @ApiProperty({
    description:
      'El identificador único del usuario. Este campo no puede ser modificado.',
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    readOnly: true,
  })
  id?: string;

  @ValidateIf((obj) => obj.email !== undefined)
  @IsEmail(
    {},
    { message: 'El correo electrónico debe tener un formato válido.' },
  )
  @ApiProperty({
    description: 'Correo electrónico válido del usuario.',
    example: 'example.123@gmail.com',
  })
  email?: string;

  @ValidateIf((obj) => obj.name !== undefined)
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @MinLength(3, { message: 'El nombre debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'El nombre no debe exceder los 80 caracteres.' })
  @ApiProperty({
    description: 'Nombre del usuario, debe tener entre 3 y 80 caracteres.',
    example: 'Juan Pérez',
  })
  name?: string;

  @ValidateIf((obj) => obj.password !== undefined)
  @MaxLength(15, {
    message: 'La contraseña no debe tener más de 15 caracteres.',
  })
  @ApiProperty({
    description:
      'Contraseña segura, con un mínimo de 8 caracteres y un máximo de 15. Debe incluir al menos 1 mayúscula, 1 minúscula, 1 número y 1 símbolo.',
    example: 'Contraseña*123',
  })
  password?: string;

  @ValidateIf((obj) => obj.address !== undefined)
  @IsString({ message: 'La dirección debe ser una cadena de texto.' })
  @MinLength(3, { message: 'La dirección debe tener al menos 3 caracteres.' })
  @MaxLength(80, { message: 'La dirección no debe exceder los 80 caracteres.' })
  @ApiProperty({
    description: 'Dirección del usuario, debe tener entre 3 y 80 caracteres.',
    example: 'Av. Principal 123, Edificio Azul, Piso 2',
  })
  address?: string;

  @ValidateIf((obj) => obj.phone !== undefined)
  @IsPhoneNumber(undefined, {
    message:
      'El número de teléfono debe tener un formato válido, incluyendo el código internacional. Ejemplo: "+541123456789".',
  })
  @ApiProperty({
    description:
      'Número de teléfono en formato internacional, incluyendo el código de país.',
    example: '+541123456789',
  })
  phone?: string;

  @ValidateIf((obj) => obj.country !== undefined)
  @IsString({ message: 'El país debe ser una cadena de texto.' })
  @MinLength(5, { message: 'El país debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'El país no debe exceder los 20 caracteres.' })
  @ApiProperty({
    description: 'País de residencia del usuario.',
    example: 'Argentina',
  })
  country?: string;

  @ValidateIf((obj) => obj.city !== undefined)
  @IsString({ message: 'La ciudad debe ser una cadena de texto.' })
  @MinLength(5, { message: 'La ciudad debe tener al menos 5 caracteres.' })
  @MaxLength(20, { message: 'La ciudad no debe exceder los 20 caracteres.' })
  @ApiProperty({
    description: 'Ciudad de residencia del usuario.',
    example: 'Buenos Aires',
  })
  city?: string;

  @ValidateIf((obj) => obj.isAdmin !== undefined)
  @IsBoolean({ message: 'El valor de administrador debe ser un booleano.' })
  @ApiProperty({
    description:
      'Indica si el usuario tiene permisos de administrador. Campo editable solo con los roles de administrador.',
    example: false,
    default: false,
  })
  isAdmin?: boolean;

  @IsEmpty({ message: 'No se pueden modificar las ordenes.' })
  orders?: Order[];

  @IsEmpty({
    message: 'No se puede modificar la fecha de creación del usuario.',
  })
  createUser?: Date;

  @IsEmpty({
    message: 'No se puede modificar la última vez que se modificó un usuario.',
  })
  updateUser?: Date;
}

export {
  UserDTO,
  UserDTOResponse,
  UserDTOResponse2,
  UserDTOResponse3,
  GetUserDTOResponse,
  DataPage,
  CreateUserDTO,
  UserDataDTO,
  UserOrderDTO,
  UserUpdateDTO,
};
