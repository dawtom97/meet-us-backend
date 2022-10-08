import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './models/user.models';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://testowy97:testowy97@cluster0.skuug.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    JwtModule.register({
      secret:'secret',
      signOptions: {expiresIn: '1d'}
    })
  ],
  controllers: [AuthController,UsersController],
  providers: [AuthService,UsersService],
})
export class UsersModule {}
