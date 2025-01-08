/* eslint-disable prettier/prettier */
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utils/Roles.enum';

export const Roles = (...role: Role[]) => SetMetadata('roles', role);
