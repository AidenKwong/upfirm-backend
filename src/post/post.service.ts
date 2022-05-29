import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePostDto } from "./dto/create-post.dto";

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreatePostDto) {
    return await this.prisma.post.create({
      data,
    });
  }
}
