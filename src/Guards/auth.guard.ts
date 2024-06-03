
import { Injectable, CanActivate, ExecutionContext, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../DB/schemas/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService:JwtService,
    @InjectModel(User.name) private userModel : Model<User>
  ){
    
  }
  async canActivate(
    context: ExecutionContext,
  ):  Promise<object>  {
    const req = context.switchToHttp().getRequest();


    const {accesstoken} = req.headers

    if(!accesstoken){
      throw new BadRequestException("Please Login First")
    }

    if(!accesstoken.startsWith("nest__")){
      throw new BadRequestException("Please Provide A Vaild Prefix")
    }

    const token = accesstoken.split("__")[1]

    const decodedData = this.jwtService.verify(token,{secret:"login-secret"})

    if(!decodedData._id){
      throw new BadRequestException("bad token")
    }
    const user = await this.userModel.findById(decodedData._id, '-password')
    if(!user){
      throw new BadRequestException("Please Sign Up First")
    }
    req.authUser = user
    return req;
  }
}