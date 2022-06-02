import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtGuardReturn } from "src/auth/interface/jwt.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FindManyDto } from "src/shared-dto/find-many.dto";
import { CreatePostDto } from "./dto/create-post.dto";

import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreatePostDto) {
    return await this.postService.create(dto);
  }

  @Get("/count")
  async count() {
    return await this.postService.count();
  }

  @Get()
  async findMany(@Query() dto: FindManyDto) {
    const { orderBy, where, include, ...rest } = dto;
    return await this.postService.findMany({
      ...rest,
      orderBy: orderBy && JSON.parse(orderBy),
      where: where && JSON.parse(where),
      include: include && JSON.parse(include),
    });
  }
}
