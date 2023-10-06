import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { jwtconstant } from './constats';
import { PostsModule } from '../posts/posts.module';

@Module({
  imports: [
    UsersModule,
    PostsModule,
    JwtModule.register({
      global: true,
      secret: jwtconstant.secret,
      signOptions: { expiresIn: jwtconstant.expiresIn },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
