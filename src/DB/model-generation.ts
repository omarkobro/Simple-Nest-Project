import { MongooseModule } from "@nestjs/mongoose";
import { User, UserSchema } from "./schemas/user.schema";

export const models = MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])