import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class SignUpBodyDTO{
    @IsString()
    @MinLength(3, {message: "Must Be At Least 2 charachters"})
    
    @MaxLength(10, {message: "Must Be At Most 10 charachters"})
    name:string

    @IsString()
    @IsEmail()
    email:string

    @IsString()
    @IsNotEmpty()
    password:string

    @IsEnum(["user","admin"])
    role:string
}