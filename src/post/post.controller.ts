import { Body, Controller, Post } from "@nestjs/common";
import { CreatePostDto } from "./dto/create-post.dto";

import { PostService } from "./post.service";

@Controller("post")
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }
}
