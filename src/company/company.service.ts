import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { FindManyCompaniesDto } from "./dto/find-many-companies.dto";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    return await this.prisma.company.create({
      data,
    });
  }

  async findMany(data: FindManyCompaniesDto) {
    return await this.prisma.company.findMany({
      ...data,
    });
  }

  async findOneById(id: number) {
    return await this.prisma.company.findUnique({
      where: {
        id,
      },
    });
  }

  async count() {
    return await this.prisma.company.count();
  }
}
