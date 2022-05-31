import { IsNotEmpty, IsString } from "class-validator";

export class ValidateUserDto {
  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
