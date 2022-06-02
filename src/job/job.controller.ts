import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { FindManyDto } from "src/shared-dto/find-many.dto";

@Controller("job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateJobDto) {
    return await this.jobService.create(dto);
  }

  @Get()
  async findMany(@Query() dto: FindManyDto) {
    const { orderBy, where, include, select, ...rest } = dto;
    return await this.jobService.findMany({
      ...rest,
      orderBy: orderBy && JSON.parse(orderBy),
      where: where && JSON.parse(where),
      include: include && JSON.parse(include),
      select: select && JSON.parse(select),
    });
  }
}
