import { BadRequestException, Injectable } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from "bcrypt"
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(private userServices:UsersService,private JWTService:JwtService){}
   async signUp(signUpDto:SignUpDto){
        const existUser = await this.userServices.findByEmail(signUpDto.email) 
        if(existUser) throw new BadRequestException("user already exist")
            const hashedPass = await bcrypt.hash(signUpDto.password,10)
            const createdUser = await this.userServices.create({...signUpDto,password:hashedPass})
        return createdUser
      }

      async signIn(signInDto:SignInDto){
        const existUser = await this.userServices.findByEmail(signInDto.email) 
        if(!existUser) throw new BadRequestException("you have to follow correct email")
        const isEqualPassword = await bcrypt.compare(signInDto.password,existUser.password)
    if(!isEqualPassword) throw new BadRequestException("you have to follow correct password")

        const payLoad = {
            userId:existUser._id,
            role:existUser.role
        }

        const accessToekn = await this.JWTService.sign(payLoad,{expiresIn:"1h"})
        console.log(accessToekn)
        return {accessToekn}
      }

        async CurrentUser(userId:string){
    const currentUser = await this.userServices.findOne(userId)
    return currentUser
  }
}
