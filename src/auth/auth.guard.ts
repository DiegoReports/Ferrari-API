<<<<<<< HEAD
import {
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from 'src/user/user.service';
=======
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { Observable } from 'rxjs';
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
<<<<<<< HEAD
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
=======

  constructor(private authService: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean> {

>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    try {
      const request = context.switchToHttp().getRequest();
      const authorization = request.headers['authorization'];
      const token = authorization.split(' ')[1];

      if (!token) {
<<<<<<< HEAD
        throw new BadRequestException('Token is required');
      }

      request.auth = await this.authService.decodeToken(token);

      request.user = await this.userService.get(request.auth.id);
=======
        throw new BadRequestException("Token is required")
      }

      const data = await this.authService.decodeToken(token);
  
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    } catch (e) {
      return false;
    }

    return true;
<<<<<<< HEAD
=======


>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
  }
}
