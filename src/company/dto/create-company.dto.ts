import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsNumber()
  @IsNotEmpty()
  @Type(() => Number)
  industryId: number;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  websiteUrl: string;
}
