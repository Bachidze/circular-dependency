import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { isValidObjectId } from 'src/users/dto/isValidObjectId.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/users/user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @UseGuards(AuthGuard)
  create(@User() userId,@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(userId,createPostDto);
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param() params:isValidObjectId) {
    return this.postsService.findOne(params.id);
  }

  @Patch(':id')
  update(@Param() params:isValidObjectId, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(params.id, updatePostDto);
  }

  @Delete(':id')
  remove(@Param() params:isValidObjectId) {
    return this.postsService.remove(params.id);
  }
}
