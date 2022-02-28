import { PrismaService } from './prisma.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [],
<<<<<<< HEAD
  providers: [PrismaService],
  exports: [PrismaService],
=======
  providers: [
    PrismaService
  ],
  exports: [
    PrismaService
  ]
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
})
export class PrismaModule {}
