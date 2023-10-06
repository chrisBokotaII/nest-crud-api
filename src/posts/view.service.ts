import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { View } from './entities/view.entity';
import Posts from './entities/post.entity';
import User from '../users/entities/user.entity';

@Injectable()
export class viewService {
  constructor(
    @InjectRepository(View)
    private readonly viewRepository: Repository<View>,
    private readonly entityManeger: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
  ) {}

  async addview(userId: string, postId: string) {
    const existingview = await this.viewRepository.findOne({
      where: {
        user: { id: userId },
        post: { id: postId },
      },
    });
    if (!existingview) {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      const post = await this.postRepository.findOne({ where: { id: postId } });
      const view = new View();
      view.user = user;
      view.post = post;
      await this.entityManeger.save(view);
    }
  }
  async countView(postId: string) {
    const view = await this.viewRepository.findAndCount({
      where: {
        post: { id: postId },
      },
    });
    return view;
  }
}
