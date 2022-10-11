import {
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { UserDocument } from 'src/users/models/user.models';
  import { Model } from 'mongoose';
  import { InjectModel } from '@nestjs/mongoose';
  
  @Injectable({})
  export class UsersService {
    constructor(
      @InjectModel('user') private userModel: Model<UserDocument>,
    ) {}
    
    async findOne(id: number) {
      if (!id) return null;
      const user = await this.userModel.findById(id);
      if (!user) throw new NotFoundException('User not found');
      return user;
    }
  
    async findEmail(email: string) {
      if (!email) return null;
      const user = await this.userModel.findOne({ email: email });
      if (!user) throw new NotFoundException('User not found');
      return user;
    }
  
    find() {
      return this.userModel.find({});
    }

    async update(id:number, attrs:Partial<UserDocument>) {
        const user = await this.findOne(id);
        if(!user) return new NotFoundException("User not found");
        Object.assign(user,attrs);
        const updatedUser =  new this.userModel(user);
        return updatedUser.save()
  }
}