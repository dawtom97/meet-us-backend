import {Controller,Post,Body, Get,Param} from '@nestjs/common'
import mongoose from 'mongoose';
import { User } from 'src/auth/models/user.models';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';

@Controller('auth')
export class AuthController {
   constructor(private authService: AuthService) {}
      
    @Post('signup')
    signup(@Body() userDto: CreateUserDto) {
        console.log(userDto)
        return this.authService.signup(userDto)
    }

    @Post('signin')
    signin() {
        return "Woah Im logged"
    }

    @Get('/:id')
    findUser(@Param('id')  id: string) {
        const query: any =  new mongoose.Types.ObjectId(id)
        return this.authService.findOne(query)
    }
   
}