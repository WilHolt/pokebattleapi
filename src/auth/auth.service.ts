import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { IUser } from 'src/interfaces/user.interface';
import { UserSchema } from 'src/schemas/user.schema';
import * as bcrypt from 'bcrypt'
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private userModel: Model<any>,
        private jwtService:JwtService
    ){}

    async login(UserDTO: IUser){
        let dbUser = await this.userModel.findOne({
            username:UserDTO.username,
        })
        console.log(dbUser)
        let salt = await bcrypt.genSalt(10)
        let encryptedPassword = await bcrypt.hash(UserDTO.password, salt)
        console.log(` encripted passord ${encryptedPassword}`)
        let compare = await bcrypt.compare(UserDTO.password, dbUser.password)
        console.log(`compare value ${compare}`)
        let payload = {dbUser}
            if(compare){
                console.log('deu certo')
                return {
                    payload:payload,
                    acess_token: this.jwtService.sign(payload),
                    expiresIn:240
                }
            }
        console.log('Loggin')
    }

    async register(UserDTO: IUser){
        let salt = await bcrypt.genSalt(10)
        let encryptedPassword = await bcrypt.hash(UserDTO.password, salt)
        UserDTO.password = encryptedPassword
        let nUser = new this.userModel(UserDTO)
        nUser.save();
        console.log('Registering')
    }
 
}
