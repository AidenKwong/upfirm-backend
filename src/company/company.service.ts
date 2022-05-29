import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company, Prisma } from "@prisma/client";

@Injectable()
export class CompanyService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCompanyDto) {
    return await this.prisma.company.create({
      data,
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

  async update(id: number, data: UpdateCompanyDto) {
    return "This action updates a company";
  }
  remove(id: number) {
    return `This action removes a #${id} company`;
  }
}
