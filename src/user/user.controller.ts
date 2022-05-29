import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto) {
    return await this.userService.create(data);
  }

  @Get("id/:id")
  async findUserById(@Param("id") id: number) {
    id = Number(id);
    return await this.userService.findOneById(id);
  }

  @Get()
  async findUserByEmail(@Query("email") email: string) {
    return await this.userService.findOneByEmail(email);
  }

  @Get("count")
  async count() {
    return await this.userService.count();
  }
}
