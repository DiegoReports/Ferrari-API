<<<<<<< HEAD
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
  Put,
  Res,
  StreamableFile,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
=======
import { BadRequestException, Body, Controller, Get, Headers, Post, Req, UseGuards } from '@nestjs/common';
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
import { UserService } from 'src/user/user.service';
import { parse } from 'date-fns';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
<<<<<<< HEAD
import { Auth } from './auth.decorator';
import { User } from 'src/user/user.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { PasswordService } from 'src/user/password.service';

@Controller('auth')
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private passwordService: PasswordService,
  ) {}

  @Post()
  async verifyEmail(@Body('email') email) {
=======

@Controller('auth')
export class AuthController {

  constructor(private userService: UserService, private authService: AuthService) { }

  @Post()
  async verifyEmail(@Body('email') email) {

>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    try {
      await this.userService.getByEmail(email);
      return { exists: true };
    } catch (e) {
      return { exists: false };
    }
  }

  @Post('register')
  async register(
    @Body('name') name,
    @Body('email') email,
    @Body('birthAt') birthAt,
    @Body('phone') phone,
    @Body('document') document,
    @Body('password') password,
<<<<<<< HEAD
  ) {
    if (birthAt) {
      try {
        birthAt = parse(birthAt, 'yyyy-MM-dd', new Date());
      } catch (e) {
        throw new BadRequestException('Birth date is invalid');
=======

  ) {

    if (birthAt) {
      try {
        // Função do Date-fns que consegue ler e converter string em data
        birthAt = parse(birthAt, "yyyy-MM-dd", new Date());

      } catch (e) {

        throw new BadRequestException("Birth date is invalid")
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
      }
    }

    const user = await this.userService.create({
      name,
      email,
      password,
      phone,
      document,
      birthAt,
<<<<<<< HEAD
=======

>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    });

    const token = await this.authService.getToken(user.id);

    return { user, token };
  }

  @Post('login')
  async login(@Body('email') email, @Body('password') password) {
<<<<<<< HEAD
    return this.authService.login({ email, password });
  }

  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Auth() auth, @User() user) {
    return {
      auth,
      user,
    };
  }

  @UseGuards(AuthGuard)
  @Put('profile')
  async profile(@User() user, @Body() body) {
    if (body.birthAt) {
      body.birthAt = parse(body.birthAt, 'yyyy-MM-dd', new Date());
    }

    return this.userService.update(user.id, body);
  }

  @UseGuards(AuthGuard)
  @Put('password')
  async changePassword(
    @Body('currentPassword') currentPassword,
    @Body('newPassword') newPassword,
    @User('id') id,
  ) {
    return this.passwordService.changePassword(id, currentPassword, newPassword);
  }

  @Post('forget')
  async forget(@Body('email') email) {
    return this.authService.recovery(email);
  }

  @Post('password-reset')
  async resetPassword(
    @Body('password') password: string,
    @Body('token') token: string,
  ) {
    return this.authService.reset({ password, token });
  }

  @UseGuards(AuthGuard)
  @UseInterceptors(
    FileInterceptor('file', {
      dest: './storage/photos',
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
    }),
  )
  @Put('photo')
  async setPhoto(@User() user, @UploadedFile() file: Express.Multer.File) {
    return this.userService.setPhoto(user.id, file);
  }

  @UseGuards(AuthGuard)
  @Get('photo')
  async getPhoto(@User('id') id, @Res({ passthrough: true }) response) {
    const { file, extension } = await this.userService.getPhoto(id);

    switch (extension) {
      case 'png':
        response.set({ 'Content-Type': 'image/png' });
        break;
      case 'jpg':
        response.set({ 'Content-Type': 'image/jpeg' });
        break;
    }

    return new StreamableFile(file);
  }
=======

    return this.authService.login({email, password});

  }

  @UseGuards(AuthGuard)
  @Get('me')
    async me() {
      return {
        sucess: true
      }
    }
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
}
