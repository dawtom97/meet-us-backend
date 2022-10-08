import { Controller, Get, Param, } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
  constructor(
    private authService: UsersService,
  ) {}

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