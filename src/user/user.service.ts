<<<<<<< HEAD
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma } from '@prisma/client';
import { join } from 'path';
import { createReadStream, existsSync, renameSync, unlinkSync } from 'fs';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
  ) {}

  async get(id: number, hash = false) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is required');
=======
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
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    }

    const user = await this.prisma.user.findUnique({
      where: {
<<<<<<< HEAD
        id,
      },
      include: {
        person: true,
=======
        id: id,
      },
      include: {
        person: true
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
      },
    });

    if (!hash) {
      delete user.password;
<<<<<<< HEAD
    }

    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
  }

  async getByEmail(email: string) {
    if (!email) {
      throw new BadRequestException('E-mail is required');
=======
    } 


    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;

  }

  async getByEmail(email: string) {

    if (!email) {

      throw new BadRequestException("E-mail is required");
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    }

    const user = await this.prisma.user.findUnique({
      where: {
        email,
      },
      include: {
<<<<<<< HEAD
        person: true,
=======
        person: true
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
      },
    });

    delete user.password;

<<<<<<< HEAD
    if (!user) {
      throw new NotFoundException('User not found');
    }

    return user;
=======

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;

>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
  }

  async create({
    name,
    email,
<<<<<<< HEAD
    password,
    birthAt,
    phone,
    document,
  }: {
    name: string;
    email: string;
    password: string;
    birthAt?: Date;
    phone?: string;
    document?: string;
  }) {
    if (!name) {
      throw new BadRequestException('Name is required.');
    }

    if (!email) {
      throw new BadRequestException('Email is required.');
=======
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
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    }

    if (!password) {
      throw new BadRequestException('Password is required.');
    }

<<<<<<< HEAD
    if (birthAt && birthAt.toString().toLowerCase() === 'invalid date') {
      throw new BadRequestException('Birth date is invalid');
=======
    if (birthAt && birthAt.toString().toLowerCase() === 'Invalid Date') {
      throw new BadRequestException('Birth date Date is Invalid');
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    }

    let user = null;

    try {
      user = await this.getByEmail(email);
<<<<<<< HEAD
    } catch (e) {}

    if (user) {
      throw new BadRequestException('Email already exists');
=======
    } catch (e) {

    }

    if (user) {
      throw new BadRequestException("Email already exists");
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
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
<<<<<<< HEAD
      },
=======
      }
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
    });

    delete userCreated.password;

    return userCreated;
  }

<<<<<<< HEAD
  async update(
    id: number,
    {
      name,
      email,
      birthAt,
      phone,
      document,
      photo,
    }: {
      name?: string;
      email?: string;
      birthAt?: Date;
      phone?: string;
      document?: string;
      photo?: string;
    },
  ) {
    id = Number(id);

    if (isNaN(id)) {
      throw new BadRequestException('ID is not a number');
    }

    const dataPerson = {} as Prisma.PersonUpdateInput;
    const dataUser = {} as Prisma.UserUpdateInput;
=======
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
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc

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

<<<<<<< HEAD
    if (email) {
      dataUser.email = email;
    }

    if (photo) {
      dataUser.photo = photo;
    }

    const user = await this.get(id);

    if (dataPerson) {
      await this.prisma.person.update({
        where: {
          id: user.personId,
        },
        data: dataPerson,
      });
    }

    if (dataUser) {
=======
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
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
      await this.prisma.user.update({
        where: {
          id,
        },
<<<<<<< HEAD
        data: dataUser,
      });
    }

    return this.get(id);
  }

  getStoragePhotoPath(photo: string) {
    if (!photo) {
      throw new BadRequestException('Photo is required.');
    }

    return join(__dirname, '../', '../', '../', 'storage', 'photos', photo);
  }

  async removePhoto(userId: number) {
    const { photo } = await this.get(userId);

    if (photo) {
      const currentPhoto = this.getStoragePhotoPath(photo);

      if (existsSync(currentPhoto)) {
        unlinkSync(currentPhoto);
      }
    }

    return this.update(userId, {
      photo: null,
    });
  }

  async setPhoto(id: number, file: Express.Multer.File) {
    if (!['image/png', 'image/jpeg'].includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type.');
    }

    await this.removePhoto(id);

    let ext = '';

    switch (file.mimetype) {
      case 'image/png':
        ext = 'png';
        break;

      default:
        ext = 'jpg';
    }

    const photo = `${file.filename}.${ext}`;
    const from = this.getStoragePhotoPath(file.filename);
    const to = this.getStoragePhotoPath(photo);

    renameSync(from, to);

    return this.update(id, {
      photo,
    });
  }

  async getPhoto(id: number) {
    const { photo } = await this.get(id);

    let filePath = this.getStoragePhotoPath('../nophoto.png');

    if (photo) {
      filePath = this.getStoragePhotoPath(photo);
    }

    const file = createReadStream(filePath);

    const extension = filePath.split('.').pop();

    return {
      file,
      extension,
    };
=======
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
>>>>>>> 6f42ee5cf38ae5fc8f7cadb63f17f8e3a856bcdc
  }
}
