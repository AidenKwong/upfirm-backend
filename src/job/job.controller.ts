import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { JobService } from "./job.service";
import { CreateJobDto } from "./dto/create-job.dto";
import { UpdateJobDto } from "./dto/update-job.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@Controller("job")
export class JobController {
  constructor(private readonly jobService: JobService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() dto: CreateJobDto) {
    return await this.jobService.create(dto);
  }

  @Get()
  findAll() {
    return this.jobService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.jobService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateJobDto: UpdateJobDto) {
    return this.jobService.update(+id, updateJobDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.jobService.remove(+id);
  }
}
