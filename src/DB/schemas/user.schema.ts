import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps:true})
export class User{
    @Prop({
        required:true,
        type:String,
        trim:true,
        lowercase:true
    })
    name:string
    @Prop({
        required:true,
        type:String,
        lowercase:true,
        unique:true
    })
    email:string
    @Prop({
        required:true,
        type:String,
    })
    password:string
    @Prop({
        required:true,
        type:String,
        enum:["user","admin"],
        default:"user"
    })
    role:string
    @Prop({
        required:true,
        type:Boolean,
        default:false,

    }) 
    isEmailVerified:boolean
}

export const UserSchema = SchemaFactory.createForClass(User);
