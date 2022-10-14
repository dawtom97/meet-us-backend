import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/create-user.dto';
import { LoginUserDto } from 'src/user/dtos/login-user.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {      }
    
    @Post('/register')
    register(@Body() user: CreateUserDto) {
        return this.authService.register(user)
    }

    @Post('/login')
    @HttpCode(HttpStatus.OK)
    login(@Body() user:LoginUserDto) {
        return this.authService.login(user)
    }

    @Post('/verify-jwt')
    @HttpCode(HttpStatus.OK)
    verifyJwt(@Body() payload:{jwt:string}) {
        return this.authService.verifyJwt(payload.jwt)
    }
}
