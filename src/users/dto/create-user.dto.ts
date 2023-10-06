import { IsEmail, IsNotEmpty } from 'class-validator';
import { createProfileDto } from './create-profile.dto';

export class CreateUserDto {
  @IsNotEmpty()
  full_name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  password: string;

  profile: createProfileDto;
}
