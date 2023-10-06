import { createProfileDto } from './create-profile.dto';

export class UserResponseDto {
  id: string;
  full_name: string;
  email: string;
  profile: createProfileDto;
}
