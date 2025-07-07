import { forwardRef, Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './entities/user.entity';
import { Post, postsSchema } from 'src/posts/entities/post.entity';
import { PostsModule } from 'src/posts/posts.module';

@Module({
  imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema}]),forwardRef(() => PostsModule),],
  controllers: [UsersController],
  providers: [UsersService],
  exports:[UsersService]
})
export class UsersModule {}
