import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import Posts from './entities/post.entity';
import { UpdatePostDto } from './dto/update-post.dto';
import User from '../users/entities/user.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Posts)
    private readonly postRepository: Repository<Posts>,
    private readonly entityManeger: EntityManager,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createPostDto: CreatePostDto, id: string) {
    try {
      const { title, content, published } = createPostDto;
      const user = await this.userRepository.findOneBy({ id });

      const post = new Posts();
      post.title = title;
      post.content = content;
      post.published = published;
      post.user = user;
      await this.entityManeger.save(post);
    } catch (error) {
      console.log(error.message);
    }
  }

  async findAll() {
    return this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.published',
        'user.full_name',
        'user.email',
      ])
      .getMany();
  }

  async findOne(id: string) {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoinAndSelect('post.user', 'user')
      .select([
        'post.id',
        'post.title',
        'post.content',
        'post.published',
        'user.full_name',
        'user.email',
      ])
      .where({ id })
      .getOne();
    if (!post) {
      throw new NotFoundException('post not found');
    }

    return post;
  }

  async update(id: string, updatePostDto: UpdatePostDto, user_id) {
    await this.entityManeger.transaction(async (entityManeger) => {
      const post = await this.postRepository.findOne({
        where: { id },
        relations: {
          user: true,
        },
      });

      if (!post) {
        throw new NotFoundException('post not found');
      }
      if (post.user.id !== user_id) {
        throw new Error('you are not the author of this post');
      }
      post.published = updatePostDto.published;

      await entityManeger.save(post);
    });
  }

  async remove(id: string, user_id: string) {
    const post = await this.postRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });
    if (post.user.id !== user_id) {
      throw new Error('you are not the author of this post');
    }
    return this.postRepository.delete({ id });
  }
}
