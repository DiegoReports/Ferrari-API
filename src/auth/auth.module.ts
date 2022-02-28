import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
<<<<<<< HEAD
import { PrismaModule } from 'src/prisma/prisma.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [
    MailModule,
    PrismaModule,
    UserModule,
    JwtModule.registerAsync({
      useFactory: () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: Number(process.env.JWT_EXPIRE),
        },
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
=======

@Module({
    imports: [
        UserModule,
        JwtModule.registerAsync({
            useFactory: () => ({
                secret: process.env.JWT_SECRET,
                signOptions: {
                    expiresIn: Number (process.env.JWT_EXPIRE)
                }
            }) 
        })
    ],
    controllers: [
        AuthController,
    ],
    providers: [
        AuthService,
    ],
})
export class AuthModule { }
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
