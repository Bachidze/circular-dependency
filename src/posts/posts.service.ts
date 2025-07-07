import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Post } from './entities/post.entity';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModule:Model<Post>,@Inject(forwardRef(() => UsersService)) private userService:UsersService){}
 async create(userId,createPostDto: CreatePostDto) {
  const newPost = await this.postModule.create({...createPostDto,user:userId})
  await this.userService.addPosts(newPost._id,userId)
    return newPost
  }

  findAll() {
    return this.postModule.find().populate("user")
  }

async  findOne(id: mongoose.Schema.Types.ObjectId) {
  if(!isValidObjectId(id)) throw new BadRequestException("1")
    const findUserById = await this.postModule.findById(id)
    return findUserById  || {message:"user not found"}
  }

async  update(id: mongoose.Schema.Types.ObjectId, updatePostDto: UpdatePostDto) {
  if(!isValidObjectId(id)) throw new BadRequestException("2")
    const updatedUser = await this.postModule.findByIdAndUpdate(id,updatePostDto,{new:true})
    return updatedUser
  }

async  remove(id: mongoose.Schema.Types.ObjectId) {
   if(!isValidObjectId(id)) throw new BadRequestException("3")
    const deletedUser = await this.postModule.findByIdAndDelete(id)
    return deletedUser
  }

async  removePostsByUserId(id: mongoose.Schema.Types.ObjectId) {
   await this.postModule.deleteMany({user:id})
    return {message:"deleted Successfully"}
  }
}
