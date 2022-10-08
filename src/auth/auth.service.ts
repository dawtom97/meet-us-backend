import {
  Injectable,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  Res,
} from '@nestjs/common';
import { User, UserDocument } from 'src/auth/models/user.models';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { Response } from 'express';
import { JwtService } from '@nestjs/jwt';


const scrypt = promisify(_scrypt);

@Injectable({})
export class AuthService {
  constructor(
    @InjectModel('user') private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  // Register user with some basic info
  async signup(user: User): Promise<User> {
    const found = await this.userModel.findOne({ email: user.email });
    if (found) throw new BadRequestException('Email already in use');

    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(user.password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    user.password = result;

    const newUser = new this.userModel(user);
    return newUser.save();
  }

  // Login with email and password to get cookie
  async signin(
    email: string,
    password: string,
    response: Response
  ) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) throw new BadRequestException('User not found');

    const [salt, storedHash] = user.password.split('.');
    const hash = (await scrypt(password, salt, 32)) as Buffer;

    if (storedHash === hash.toString('hex')) {
      const jwt = await this.jwtService.signAsync(user.toJSON());
      response.cookie('jwt', jwt, { httpOnly: true });
  
      return {
        message:"success"
      };

    } else {
      throw new BadRequestException('Incorrect password');
    }
  }

  // Get user by cookie
  async login(request: Request) {
    try {
      const cookie = request['jwt'];

      const data = await this.jwtService.verifyAsync(cookie);

      if(!data) {
        throw new UnauthorizedException('k')
      }
      const user = await this.findOne(data._id);

      return user;

    } catch (err) {
      throw new UnauthorizedException("b")
    }
  }

  async logout(reponse:Response) {
     reponse.clearCookie('jwt');
     return {
      message:"Success logout"
     }
  }


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

}
