import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtConstants } from '../constants';
import { IUser } from 'src/interfaces/user.interface';
import passport = require('passport');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JwtConstants.secret,
    });
    passport.use(this)
  }

  async validate(payload: IUser) {
        return payload;
  }
}