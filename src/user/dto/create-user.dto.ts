import { Gender } from "@prisma/client";
import { Type } from "class-transformer";
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MinLength,
} from "class-validator";

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  lastName: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  password: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  age: number;

  @IsString()
  @IsNotEmpty()
  gender: Gender;

  @IsString()
  @IsNotEmpty()
  country: string;
}
