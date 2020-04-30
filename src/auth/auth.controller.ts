import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import * as bcrypt from 'bcrypt';
import { IUser } from 'src/interfaces/user.interface';

@Controller('')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('login')
    login(@Body() user: IUser){
      return this.authService.login(user) 
    }

    @Post('register')
    register(@Body() user: IUser){
     return this.authService.register(user)
    }
}
