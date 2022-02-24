import { UserModule } from './user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';

@Module({
  imports: [
    UserModule,
    PrismaModule
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
