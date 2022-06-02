import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class FindManyDto {
  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  skip: number;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  take: number;

  @IsOptional()
  orderBy?: any;

  @IsOptional()
  where?: any;

  @IsOptional()
  include?: any;

  @IsOptional()
  select?: any;
}
