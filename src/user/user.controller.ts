import { Body, Controller, Get, Param, Put, Query } from '@nestjs/common';
<<<<<<< HEAD
import { id } from 'date-fns/locale';
=======
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
import { UserService } from './user.service';

@Controller('users')
export class UserController {
<<<<<<< HEAD
  constructor(private userService: UserService) {}
=======

  constructor(private userService: UserService) { }
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc

  @Get(':id')
  async show(@Param('id') id) {
    return this.userService.get(id);
  }

  @Get()
  async showByEmail(@Query('email') email) {
    return this.userService.getByEmail(email);
  }

  @Put(':id')
<<<<<<< HEAD
  async update(@Param('id') id, @Body() body) {
=======
  async update(
    @Param('id') id,
    @Body() body,
  ) {
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    return this.userService.update(id, body);
  }
}
