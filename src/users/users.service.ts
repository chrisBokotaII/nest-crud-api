import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { EntityManager, Repository } from 'typeorm';
import User from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Profile } from './entities/profile.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly entityManeger: EntityManager,
  ) {}
  async create(createUserDto: CreateUserDto) {
    try {
      const { full_name, email, password, profile } = createUserDto;

      const profileEntity = new Profile(profile);

      const saltOrRounds = 10;
      const hash = await bcrypt.hash(password, saltOrRounds);

      const user = new User();
      user.email = email;
      user.full_name = full_name;
      user.password = hash;
      user.profile = profileEntity;

      await this.entityManeger.save(user);
    } catch {
      throw new HttpException('email already used', HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    return this.userRepository.find({
      relations: {
        profile: true,
        post: true,
      },
    });
  }

  async findOne(id: string) {
    return this.userRepository.findOne({
      where: { id },
      relations: {
        profile: true,
      },
    });
  }
  async findByEmail(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: {
        profile: true,
      },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    //
    await this.entityManeger.transaction(async (entityManeger) => {
      const user = await this.userRepository.findOneBy({ id });
      if (!user) {
        throw new NotFoundException('User not found');
      }
      user.full_name = updateUserDto.full_name;
      user.email = updateUserDto.email;

      await entityManeger.save(user);
    });
  }

  async remove(id: string) {
    return this.userRepository.delete({ id });
  }
}
