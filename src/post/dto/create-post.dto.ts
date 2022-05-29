import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  authorId: number;

  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  companyId: number;
}
