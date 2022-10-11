import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserSchema } from './models/user.models';
import { JwtModule } from '@nestjs/jwt';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { AccessTokenStrategy } from 'src/strategies/accessToken.strategy';
import { RefreshTokenStrategy } from 'src/strategies/refreshTokenStrategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://testowy97:testowy97@cluster0.skuug.mongodb.net/?retryWrites=true&w=majority',
    ),
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: { expiresIn: '60s' },
        };
      },
      inject: [ConfigService],
      
    }),
  ],
  controllers: [AuthController,UsersController],
  providers: [AuthService,UsersService,AccessTokenStrategy,RefreshTokenStrategy,ConfigService],
})
export class UsersModule {}
