import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateIndustryDto } from "./dto/create-industry.dto";
import { UpdateIndustryDto } from "./dto/update-industry.dto";

@Injectable()
export class IndustryService {
  constructor(private prisma: PrismaService) {}

  async create(createIndustryDto: CreateIndustryDto) {
    return await this.prisma.industry.create({
      data: createIndustryDto,
    });
  }

  async findAll() {
    return await this.prisma.industry.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.industry.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, updateIndustryDto: UpdateIndustryDto) {
    return `This action updates a #${id} industry`;
  }

  remove(id: number) {
    return `This action removes a #${id} industry`;
  }
}
