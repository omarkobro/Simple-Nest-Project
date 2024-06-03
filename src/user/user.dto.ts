import { IsEmail, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UpdateUser{
    @IsString()
    @MinLength(3, {message: "Must Be At Least 2 charachters"})
    @MaxLength(10, {message: "Must Be At Most 10 charachters"})
    @IsOptional()
    name:string

    @IsString()
    @IsEmail()
    @IsOptional()
    email:string

}