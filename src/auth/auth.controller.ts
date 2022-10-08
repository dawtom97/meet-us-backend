import { Controller, Post, Body, Get, Param, Res,Req } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto) {
    const user = await this.authService.signup(userDto);

    return user;
  }

  @Post('/signin')
  async signin(
    @Body() body: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.signin(body.email, body.password,response);
    return user;
  }

  @Get('/user')
  async loginUser(@Req() request: Request) {
     const user = await this.authService.login(request.cookies)
     return user;
  }
  @Post('/logout')
  async logoutUser( @Res({ passthrough: true }) response: Response) {
    return await this.authService.logout(response)
  }

  @Get('/:email')
  findByEmail(@Param('email') email: string) {
    return this.authService.findEmail(email);
  }

  @Get()
  findAllUsers() {
    return this.authService.find();
  }

    // @Get('/:id')
  // findUser(@Param('id') id: string) {
  //   const query: any = new mongoose.Types.ObjectId(id);
  //   return this.authService.findOne(query);
  // }
}
