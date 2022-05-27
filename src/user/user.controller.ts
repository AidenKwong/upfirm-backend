import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
  constructor(private userService: UserService) {}

  @Post("create")
  async createUser(@Body() data: CreateUserDto) {
    data.age = Number(data.age);
    return this.userService.createUser(data);
  }
}
