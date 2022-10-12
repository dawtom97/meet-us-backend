import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDocument } from './schema/user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<UserDocument>) {}

    async create(@Body() body:CreateUserDto):Promise<UserDocument> {
        const newUser = new this.userModel(body);
        return newUser.save()
    }
}
