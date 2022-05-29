import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({
      data,
    });
  }

  async findOneById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async count() {
    return await this.prisma.user.count();
  }
}
