
import { BadRequestException, ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "../../DB/schemas/user.schema";

import * as bcrypt from "bcrypt"

import { SendEmailService } from "../../common/services/send-email.service";
import { JwtService } from "@nestjs/jwt";


@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private userModel: Model<User>,
        private sendEmailService :SendEmailService,
        private jwtService: JwtService
    ){
    }
    serviceOne(){ 
        return "Auth Service"
    }
    async signUpService(req:any){
        const {name , email, password,role} = req.body;
        const isEmailExists = await this.userModel.findOne({email})
        //check for the email
        if(isEmailExists){
            throw new ConflictException("Email Already Exist, Please Try Another Email")
        }
        //hash THe Password
        const hashedPassword = bcrypt.hashSync(password, 10) 
                // send confirmation email
                const token = this.jwtService.sign({ email }, { secret: 'my-secret' });
                const confirmationLink = `${req.protocol}://${req.headers.host}/auth/verifyEmail/${token}`
                const isEmailSent = await this.sendEmailService.sendEmail(
                    email,
                    'Welcome to our app',
                    `<h1>Click on the link to confirm your email</h1>
                    <a href="${confirmationLink}">Confirm Email</a>`
                );
                if (!isEmailSent) throw new InternalServerErrorException(`Email not sent to ${email}`);
        // Create New User
        const user = await this.userModel.create({name,email,password:hashedPassword,role})
        return user
    }
    async verifyEmailService(req:any){
    // here we will check the token provided in the query and check for user 
    const {token} = req.query
    const decodedToken = this.jwtService.verify( token, {secret:"my-secret"})
    const checkUser = await this.userModel.findOneAndUpdate({email: decodedToken.email ,isEmailVerified:false},{isEmailVerified:true},{new:true})
    if(!checkUser){ 
        // return next({message:"Already verified", cause:404})
        throw new ConflictException("Already verified")
    }
    return checkUser
    }
    
    // Login Serivce 
    async loginService(req: any) {
        const { email, password } = req.body;
        const user = await this.userModel.findOne({ email });
        if (!user) {
            throw new BadRequestException('Invalid credentials');
        }
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            throw new BadRequestException('Invalid credentials');
        }
        // generate token
        const token = this.jwtService.sign({ email, _id: user._id }, { secret: 'login-secret', expiresIn: '1h' });
        return token;
    }
}