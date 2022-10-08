import { Controller, Get, Param, Patch, Body } from '@nestjs/common';
import mongoose from 'mongoose';
import { UpdateUserDto } from './dtos/update-user.dto';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {}

  @Get('/:email')
  findByEmail(@Param('email') email: string) {
    return this.userService.findEmail(email);
  }

  @Get()
  findAllUsers() {
    return this.userService.find();
  }

  @Patch('/:id')
  updateUser(@Param('id') id:string, @Body() body: UpdateUserDto) {
     const query: any = new mongoose.Types.ObjectId(id)
     console.log(body,query)
     return this.userService.update(query,body)
  }

    // @Get('/:id')
  // findUser(@Param('id') id: string) {
  //   const query: any = new mongoose.Types.ObjectId(id);
  //   return this.authService.findOne(query);
  // }
}