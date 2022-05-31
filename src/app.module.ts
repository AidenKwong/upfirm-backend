import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserController } from "./user/user.controller";
import { UserModule } from "./user/user.module";
import { CompanyModule } from "./company/company.module";
import { IndustryModule } from "./industry/industry.module";
import { JobModule } from "./job/job.module";
import { PostModule } from "./post/post.module";
import { CommentModule } from "./comment/comment.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";

@Module({
  imports: [
    UserModule,
    CompanyModule,
    IndustryModule,
    JobModule,
    PostModule,
    CommentModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController, UserController],
  providers: [AppService],
})
export class AppModule {}
