

import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { AuthService } from "../services";
import { Request, Response } from 'express';
import { SignUpBodyDTO } from "../auth.dto";

@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService,

    ){}

    @Get("test")
    authController(){
        return this.authService.serviceOne()
    }

    //Sign Up
    @Post("signUp")
    async signUpController(
        @Body() body: SignUpBodyDTO,
        @Req() req:Request ,
        @Res() res:Response
    ){
        const response =  await this.authService.signUpService(req)
        return res.status(200).json({message: "User Created Succesfully",data: response})
    }

    @Get("verifyEmail")
    async verifyEmail(@Req() req:Request , @Res() res:Response){
        const response = await this.authService.verifyEmailService(req)
        return res.status(200).json({message: "Email Verified Succesfully",data: response})
    }
    @Post('login')
    async loginController(
        @Req() req: Request,
        @Res() res: Response
    ) {
        // call login service
        const response = await this.authService.loginService(req);
        // send response
        res.status(200).json({
            message: 'User logged in successfully',
            data: response
        });
    }
} 