import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './user.decorator';
import { IsAdmin } from 'src/auth/isAdmin.guard';
import { isValidObjectId } from './dto/isValidObjectId.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('')
  @UseGuards(AuthGuard)
  update(@User() userId, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete('')
  @UseGuards(AuthGuard)
  remove(@User() userId) {
    return this.usersService.remove(userId);
  }

  @Delete(":id")
  @UseGuards(AuthGuard)
  rmeoveOtherUser(@Param() params:isValidObjectId){
   return this.usersService.remove(params.id);
  }

  @Get("change-role/:id")
  @UseGuards(AuthGuard,IsAdmin)
  chnageRole(@Param() param:isValidObjectId, @Body() dto){

  }
}
