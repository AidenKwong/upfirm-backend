import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from "@nestjs/common";
import { JwtGuardReturn } from "src/auth/interface/jwt.interface";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
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
}
