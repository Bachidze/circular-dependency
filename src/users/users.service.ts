import { BadRequestException, forwardRef, Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './entities/user.entity';
import mongoose, { isValidObjectId, Model } from 'mongoose';
import { Post } from 'src/posts/entities/post.entity';
import { PostsService } from 'src/posts/posts.service';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel:Model<User>,@Inject(forwardRef(() => PostsService)) private postsService:PostsService){}
 async create(createUserDto: CreateUserDto) {
  const existUser = await this.userModel.findOne({email:createUserDto.email})
  if(existUser) throw new BadRequestException("email already exists")
    const createdUser = await this.userModel.create(createUserDto)
    return createdUser
  }

 async findAll() {
    return this.userModel.find().populate("posts")
  }


  async findByEmail(email:string){
    const existUser = await this.userModel.findOne({email:email})
    return existUser
  }

 async findOne(id: string) {
  if(!isValidObjectId(id)) throw new BadRequestException("invalid id1")
    const findUser = await this.userModel.findById(id).populate({path:"posts",select:"-user"})
    return findUser || {}
  }


 async update(id: string, updateUserDto: UpdateUserDto) {
  if(!isValidObjectId(id)) throw new BadRequestException("invalid id2")
    const updatedUser = await this.userModel.findByIdAndUpdate(id,updateUserDto,{new:true})
    return updatedUser
  }


 async remove(id: mongoose.Schema.Types.ObjectId) {
    const deletedUser = await this.userModel.findByIdAndDelete(id)
    if(!deletedUser) throw new BadRequestException("user not found")
      await this.postsService.removePostsByUserId(id)
    return deletedUser
  }

  async addPosts(postId,userId){
  const updatedUser =  await this.userModel.findByIdAndUpdate(userId,{$push:{posts:postId}},{new:true})

  return updatedUser
  }
}
