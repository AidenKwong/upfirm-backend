import { Body, Controller, Get, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";

import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private postService: PostService) {}

  @Post()
  async create(@Body() dto: CreatePostDto) {
    return await this.postService.create(dto);
  }

  @Get("/count")
  async count() {
    return await this.postService.count();
  }
}
