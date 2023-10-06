import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import Posts from '../../posts/entities/post.entity';
import { Profile } from './profile.entity';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  full_name: string;

  @Column({ nullable: false, unique: true })
  email: string;
  @Column({ nullable: false })
  password: string;

  @OneToOne(() => Profile, { cascade: true })
  @JoinColumn()
  profile: Profile;

  @OneToMany(() => Posts, (post) => post.user)
  post: Posts[];
}
