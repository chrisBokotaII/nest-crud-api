import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userservice: UsersService,
    private jwtService: JwtService,
  ) {}
  async signin(createAuthDto: CreateAuthDto): Promise<{ token: string }> {
    const user = await this.userservice.findByEmail(createAuthDto.email);

    const isPasswordValid = await bcrypt.compare(
      createAuthDto.password,
      user.password,
    );

    if (!user && !isPasswordValid) {
      throw new Error('invalid cridential');
    }
    const payload = { sub: user.id, usermail: user.email };
    return {
      token: await this.jwtService.signAsync(payload),
    };
  }
}
