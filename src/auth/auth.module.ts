import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt'
import { JwtConstants } from 'src/constants';
import { JwtStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schemas/user.schema';

@Module({
  imports:[
    JwtModule.register({
      secret: JwtConstants.secret,
      signOptions: { expiresIn: '160s' },
    }),
    PassportModule.register({
      defaultStrategy:'jwt'
    }),
    MongooseModule.forFeature([
      {name:'User', schema:UserSchema}
    ])
  ],
  controllers: [AuthController],
  exports: [],

  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
