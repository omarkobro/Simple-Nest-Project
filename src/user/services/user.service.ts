
import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../DB/schemas/user.schema";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name) private userModel:Model<User>
    ){}
    //Get User Profile
    async getUserProfile(req:any){
        const {_id} = req.authUser
        const user = await this.userModel.findById(_id, "-password")
        if(!user){
            throw new NotFoundException("User Not Found")
        }
        return user
    }

    //Update User 
    async updateAccount(req:any){
        // 1- destruct Data
        const {_id} = req.authUser
        const {name, email} = req.body
        //2- check For The User
        const checkUser = await this.userModel.findById(_id)
        if(!checkUser){
            throw new NotFoundException("User Not Found")
        }

        const checkForEmail = await this.userModel.findOne({email})
        if(checkForEmail){
            throw new ConflictException("Email Address is Already In User, Please Try to use another email")
        }

        const updatedUserObject = {
            name,
            email
        }

        const updatedUser =await this.userModel.findByIdAndUpdate(_id, updatedUserObject, {new: true})

        if(!updatedUser){
            throw new InternalServerErrorException("Something went wrong while updating, please try again later")
        }
        return updatedUser
    }
    

    // Delete User 
    async deleteAccount(req:any){
        // 1- destruct Data
        const {_id} = req.authUser
        // 2 check for the user and delete 
        const user = await this.userModel.findByIdAndDelete(_id)

        if(!user){  
            throw new NotFoundException("User Not Found")
        }

        //3 - return the user
        return user
    }


}