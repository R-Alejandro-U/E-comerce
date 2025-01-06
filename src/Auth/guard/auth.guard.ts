/* eslint-disable prettier/prettier */
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SECRET_WORD } from 'src/config/envs';
import { Role } from 'src/utils/Roles.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly jwtService: JwtService,
  ) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );
    if (isPublic) return true;

    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers['authorization'];
    if(!authHeader) return false;
    if (!authHeader.startsWith('Bearer ')) throw new UnauthorizedException('Formato de autorización inválido.');
    const token: string = authHeader.split(' ')[1];
    if (!token) throw new UnauthorizedException('Falta el token de autorización.');

    try {
      const secret: string | undefined = SECRET_WORD;
      const payload = await this.jwtService.verifyAsync(token, { secret });
      
      if(payload.isAdmin) payload.roles = [Role.admin];
      else payload.roles = [Role.user];

      req.access = {
        ...payload,
        exp: new Date(payload.exp * 1000),
        iat: new Date(payload.iat * 1000),
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token ivalido');
    }
  }
}
