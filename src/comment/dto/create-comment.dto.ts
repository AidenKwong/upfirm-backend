import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  authorId: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  postId: number;
}
