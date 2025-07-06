import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("sign-up")
  signUp(@Body() signUpDto:SignUpDto){
    return this.authService.signUp(signUpDto)
  }

  @Post("sign-in")
  signIn(@Body() signInDto:SignInDto){
    return this.authService.signIn(signInDto)
  }

  @UseGuards(AuthGuard)
  @Get("current-user")
     CurrentUser(@User() userId){
    return this.authService.CurrentUser(userId)
  }
}
