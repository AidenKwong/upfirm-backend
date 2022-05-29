import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { IndustryService } from "./industry.service";
import { CreateIndustryDto } from "./dto/create-industry.dto";
import { UpdateIndustryDto } from "./dto/update-industry.dto";

@Controller("industry")
export class IndustryController {
  constructor(private readonly industryService: IndustryService) {}

  @Post()
  async create(@Body() createIndustryDto: CreateIndustryDto) {
    return await this.industryService.create(createIndustryDto);
  }

  @Get()
  findAll() {
    return this.industryService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: number) {
    return this.industryService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: number,
    @Body() updateIndustryDto: UpdateIndustryDto,
  ) {
    return this.industryService.update(id, updateIndustryDto);
  }

  @Delete(":id")
  remove(@Param("id") id: number) {
    return this.industryService.remove(id);
  }
}
