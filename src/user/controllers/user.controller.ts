import { Body, Controller, Delete, Get, Put, Req, Res, UseGuards } from "@nestjs/common";

import { UserService } from "../services";
import { Request, Response } from "express";
import { AuthGuard } from "../../Guards/auth.guard";
import { UpdateUser } from "../user.dto";

@Controller("user")
export class UserController {
    constructor(private readonly userService:UserService){}
    // Get User Profile Router
    @Get("getUserProfile")
    //Here We'll apply the Guard to the router
    @UseGuards(AuthGuard)
    async getUserProfile(
    @Req() req: Request,
    @Res() res: Response
){
    const response = await this.userService.getUserProfile(req)
    return res.status(200).json({message:"Profile", data:response})
    }

    // Update User Router
    @Put("updateUser")
    @UseGuards(AuthGuard)
    async updateUser(
        @Body() body: UpdateUser,
        @Req() req: Request,
        @Res() res: Response
    ){
        const response = await this.userService.updateAccount(req)
        return res.status(200).json({message:"Profile Updated Successfully", data:response})
    }

    // Delete User Router

    @Delete("deleteUser")
    @UseGuards(AuthGuard)
    async deleteUser(
        @Req() req: Request,
        @Res() res: Response
    ){
        const response = await this.userService.deleteAccount(req)
        return res.status(200).json({message:"Account Deleted Successfully", data:response})
    }
} 