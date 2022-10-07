import { Controller, Post, Body, Get, Param,Query } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto) {
    return this.authService.signup(userDto);
  }

  @Post('/signin')
  async signin(@Body() body: LoginUserDto) {
    const user = await this.authService.signin(body.email,body.password)
    return user;
  }

  // @Get('/:id')
  // findUser(@Param('id') id: string) {
  //   const query: any = new mongoose.Types.ObjectId(id);
  //   return this.authService.findOne(query);
  // }

  @Get('/:email')
  findByEmail(@Param('email') email:string) {
    return this.authService.findEmail(email)
  }

  @Get()
  findAllUsers() {
    return this.authService.find()
  }
}
