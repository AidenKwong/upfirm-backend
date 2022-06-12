import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create-user.dto";
import * as bcrypt from "bcrypt";
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    const { password, ...rest } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.prisma.user.create({
      data: {
        ...rest,
        password: hashedPassword,
      },
    });
    delete newUser.password;
    return newUser;
  }

  // used by auth.module for authentication
  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  // return profile without password
  async getProfile(id: number) {
    const { password, ...rest } = await this.prisma.user.findUnique({
      where: {
        id,
      },
      include: {
        companies: true,
        jobs: true,
        posts: true,
      },
    });
    return rest;
  }

  async count() {
    return await this.prisma.user.count();
  }
}
