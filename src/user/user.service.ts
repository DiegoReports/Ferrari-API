import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async get(id: number) {

    id = Number(id); // Fazendo a conversão para numero. Caso não seja, estamos forçando NaN

    if (isNaN(Number(id))) {

      throw new BadRequestException("Id is required");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        person: true
      },
    });


    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;

  }

  async getByEmail(email: string) {

    if (!email) {

      throw new BadRequestException("E-mail is required");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
        person: true
      },
    });


    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;

  }

  async create({
    name,
    email,
    birthAt,
    phone,
    document,
    password
  }: {
    // Campos não obrigatórios contem "?""

    name: string;
    email: string;
    birthAt?: Date;
    phone?: string;
    document?: string
    password: string;
  }) {

    if (!email) {
      throw new BadRequestException('E-mail is required.');
    }

    if (!name) {
      throw new BadRequestException('Name is required.');
    }

    if (!password) {
      throw new BadRequestException('Password is required.');
    }

    if (birthAt && birthAt.toString().toLowerCase() === 'Invalid Date') {
      throw new BadRequestException('Birth date Date is Invalid');
    }

    let user = null;

    try {
      user = await this.getByEmail(email);
    } catch (e) {

    }

    if (user) {
      throw new BadRequestException("Email already exists");
    }

    return this.prisma.user.create({
      data: {
        person: {
          create: {
            name,
            birthAt,
            document,
            phone,
          },
        },
        email,
        password,
      },
      include: {
        person: true,
      }
    });
  }
}
