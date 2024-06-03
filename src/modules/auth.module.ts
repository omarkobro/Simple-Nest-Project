
import { Module } from "@nestjs/common";
import { AuthController } from "../auth/controllers";
import { AuthService } from "../auth/services";
import { models } from "../DB/model-generation";
import { JwtService } from "@nestjs/jwt";
import { SendEmailService } from "../common/services/send-email.service";

@Module({
    imports:[models],
    controllers:[AuthController],
    providers:[AuthService,JwtService, SendEmailService]
})
export class AuthModule {}