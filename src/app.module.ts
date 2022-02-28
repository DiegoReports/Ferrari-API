<<<<<<< HEAD
import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PrismaModule } from './prisma/prisma.module';
import { ContactModule } from './contact/contact.module';

@Module({
  imports: [MailModule, AuthModule, UserModule, PrismaModule, ContactModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
=======
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    AuthModule,
    UserModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
