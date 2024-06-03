import { Global, Module } from "@nestjs/common";
import { SendEmailService } from "../common/services/send-email.service";

// we can apply the global decorator so we be able to share the service all over the project
@Global()
@Module({
    imports:[],
    controllers:[],
    providers:[SendEmailService],
    exports:[SendEmailService]
})

export class CommonModule {}