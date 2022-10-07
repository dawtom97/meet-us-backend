import {Injectable, NotFoundException} from '@nestjs/common';
import { User,UserDocument } from 'src/auth/models/user.models';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable({})
export class AuthService {

    constructor(
        @InjectModel('user') private userModel: Model<UserDocument>
    ){}
   

    async signup(user:User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save()
    }


    signin() {}

    async findOne(id:number) {
        if(!id) return null;
        const user = await this.userModel.findById(id);
        if(!user) throw new NotFoundException("User not found");
        return user;
    }
}
