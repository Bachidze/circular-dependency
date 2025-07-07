import { forwardRef, Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from 'src/users/users.module';
import mongoose from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, postsSchema } from './entities/post.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports:[MongooseModule.forFeature([{name:Post.name,schema:postsSchema}]),forwardRef(() => UsersModule)],
  exports:[PostsService]
})
export class PostsModule {}
