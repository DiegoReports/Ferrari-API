import { UserController } from './user.controller';
import { UserService } from './user.service';
<<<<<<< HEAD
import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';
import { PasswordService } from './password.service';

@Module({
  imports: [PrismaModule, MailModule],
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService, PasswordService],
})
export class UserModule {}
=======
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
    imports: [
        PrismaModule
    ],
    controllers: [
        UserController,
    ],
    providers: [
        UserService,
    ],
    exports: [
        UserService
    ]
})
export class UserModule { }
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
