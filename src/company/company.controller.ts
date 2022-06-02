import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Query,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FindManyDto } from "src/shared-dto/find-many.dto";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCompanyDto) {
    return await this.companyService.create(dto);
  }

  @Get()
  async findMany(@Query() dto: FindManyDto) {
    const { orderBy, where, include, ...rest } = dto;

    return await this.companyService.findMany({
      ...rest,
      orderBy: orderBy && JSON.parse(orderBy),
      where: where && JSON.parse(where),
      include: include && JSON.parse(include),
    });
  }

  @Get("id/:id")
  findOneById(@Param("id") id: number) {
    return this.companyService.findOneById(id);
  }

  @Get("count")
  count() {
    return this.companyService.count();
  }
}
