import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Posts from './post.entity';
import User from '../../users/entities/user.entity';

@Entity()
export class View {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Posts, (post) => post.view)
  @JoinColumn({ name: 'post_id' })
  post: Posts;
}
