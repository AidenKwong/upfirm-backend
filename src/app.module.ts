import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { CompanyModule } from './company/company.module';
import { IndustryModule } from './industry/industry.module';
import { JobModule } from './job/job.module';


@Module({
  imports: [UserModule, CompanyModule, IndustryModule, JobModule],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
