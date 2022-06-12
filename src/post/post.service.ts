import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { FindManyDto } from "src/shared-dto/find-many.dto";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    return await this.prisma.post.create({
      data,
    });
  }

  async count() {
    return await this.prisma.post.count();
  }

  async findMany(data: FindManyDto) {
    const { where, ...rest } = data;
    return await this.prisma.post.findMany({
      ...rest,
      where: {
        companyId: parseInt(where.companyId, 10),
      },
    });
  }

  async findOneById(id: number) {
    return await this.prisma.post.findUnique({
      where: {
        id,
      },
    });
  }
}
