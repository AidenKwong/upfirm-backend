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
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { FindManyCompaniesDto } from "./dto/find-many-companies.dto";

@Controller("company")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateCompanyDto) {
    return await this.companyService.create(dto);
  }

  @Get()
  async findMany(@Query() dto: FindManyCompaniesDto) {
    const { orderBy, where, ...rest } = dto;

    return await this.companyService.findMany({
      ...rest,
      orderBy: orderBy && JSON.parse(orderBy),
      where: where && JSON.parse(dto.where),
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
