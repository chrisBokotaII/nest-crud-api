import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Posts from './entities/post.entity';
import { View } from './entities/view.entity';
import { viewService } from './view.service';
import User from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts, View])],
  controllers: [PostsController],
  providers: [PostsService, viewService],
  exports: [PostsService, viewService],
})
export class PostsModule {}
