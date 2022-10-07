import { Controller, Post, Body, Get, Param,Session} from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dtos/create-user.dto';
import { LoginUserDto } from './dtos/login-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}


  @Post('/signup')
  async signup(@Body() userDto: CreateUserDto, @Session() session:any) {
    const user = await this.authService.signup(userDto);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signin(@Body() body: LoginUserDto, @Session() session:any) {
    const user = await this.authService.signin(body.email,body.password);
    session.userId = user.id;
    console.log(session);
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
