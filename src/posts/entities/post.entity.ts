import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { View } from './view.entity';
import User from '../../users/entities/user.entity';

@Entity()
export default class Posts {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column({ nullable: false })
  title: string;

  @Column({ nullable: false })
  content: string;

  @Column({ default: false, nullable: false })
  published: boolean;

  @ManyToOne(() => User, (user) => user.post)
  @JoinColumn({ name: 'user_id' })
  user: User;
  @OneToMany(() => View, (view) => view.post)
  @JoinColumn({ name: 'post_id' })
  view: View[];
}
