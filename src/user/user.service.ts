import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDocument } from './schema/user.schema';
import { UserDetails } from './user-details.interface';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    _getUserDetails(user:UserDocument): UserDetails {
        return {
            id:user._id,
            name:user.name,
            email:user.email,
            birthday_date: user.birthday_date
        }
    }

    async findByEmail(email:string):Promise<UserDocument> {
        return this.userModel.findOne({email}).exec();
    }

    async findById(id:string):Promise<UserDetails> {
         const user = await this.userModel.findById(id).exec();
         console.log(user)
         if(!user) return null;
       
         return this._getUserDetails(user);
    }

    async create(@Body() body:CreateUserDto):Promise<UserDocument> {
        const newUser = new this.userModel(body);
        return newUser.save()
    }
}
