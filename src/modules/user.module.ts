
import { Module } from "@nestjs/common";
import { UserController } from "../user/controllers";
import { UserService } from "../user/services";
import { JwtService } from "@nestjs/jwt";
import { models } from "../DB/model-generation";

@Module({
    imports:[models],
    controllers:[UserController],
    providers:[UserService, JwtService]
})
export class UserModule {}