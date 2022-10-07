import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { User, UserDocument } from 'src/auth/models/user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes, scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt);

@Injectable({})
export class AuthService {
  constructor(@InjectModel('user') private userModel: Model<UserDocument>) {}

  async signup(user: User): Promise<User> {

    const found = await this.userModel.findOne({email:user.email});
    if(found) throw new BadRequestException("Email already in use");

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(user.password,salt,32) as Buffer);
    const result = salt + '.' + hash.toString('hex');
    user.password = result;

    const newUser = new this.userModel(user);
    return newUser.save();
  }

  async signin(email:string, password:string) {
      const user = await this.userModel.findOne({email:email});
      if(!user) throw new BadRequestException("User not found");
      const [salt,storedHash] = user.password.split(".");
      const hash = (await scrypt(password,salt,32) as Buffer);
      if (storedHash === hash.toString("hex")) {
        return user;
    } else {
        throw new BadRequestException("Incorrect password")
    }
  }

  async findOne(id: number) {
    if (!id) return null;
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async findEmail(email:string) {
    if (!email) return null;
    const user = await this.userModel.findOne({email:email})
    if(!user) throw new NotFoundException("User not found");
    return user;
  }

  find() {
    return this.userModel.find({})
  }
}
