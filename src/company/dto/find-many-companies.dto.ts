import { plainToClass, Transform, Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { json } from "stream/consumers";

export class FindManyCompaniesDto {
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
}
