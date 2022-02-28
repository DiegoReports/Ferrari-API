import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {Prisma} from '@prisma/client';
@Injectable()
export class UserService {

  constructor(private prisma: PrismaService) { }

  async get(id: number, hash = false) {

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

    if (!hash) {
      delete user.password;
    } 


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

    delete user.password;


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

    const userCreated = await this.prisma.user.create({
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
        password: bcrypt.hashSync(password, 10),
      },
      include: {
        person: true,
      }
    });

    delete userCreated.password;

    return userCreated;
  }

  async update (id: number, {
    name,
    email,
    birthAt,
    phone,
    document,
  }: {
    // Campos não obrigatórios contem "?""

    name: string;
    email: string;
    birthAt?: Date;
    phone?: string;
    document?: string
  }) {

    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException("ID is not a number");
    }

    const dataPerson = {} as Prisma.PersonUpdateInput;
    const datauser = {} as Prisma.UserUpdateInput;

    if (name) {
      dataPerson.name = name;
    }

    if (birthAt) {
      dataPerson.birthAt = birthAt;
    }

    if (phone) {
      dataPerson.phone = phone;
    }

    if (document) {
      dataPerson.document = document;
    }

    if(email) {
      datauser.email = email;
    }

    // CARREGAMENTO ANTES DAS ALTERAÇÕES
    const user = await this.get(id);

    if(dataPerson) {
       await this.prisma.person.update({
        where: {
          id: user.id,
        },
        data: dataPerson
      });
    }
    
    if (datauser) {
      await this.prisma.user.update({
        where: {
          id,
        },
        data: datauser
      });
    }
  
    // CARREGAMENTO APÒS AS ALTERAÇÕES
    return this.get(id);
  }

  async checkPassword(id: number, password: string) {

    const user = await this.get(id, true);

    const checked = await bcrypt.compare(password, user.password);

    if(!checked) {
      throw new UnauthorizedException("Email of Password is incorrect");
    }

    return true;
  }
}
