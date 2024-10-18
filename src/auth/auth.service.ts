import { Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { User } from 'src/models/users.entity';
import { UserService } from 'src/users/user.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private userService: UserService,
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<User | string> {
    try {
      const { email, password } = registerUserDto;

      const hasEmailError = this.userService.validateEmail(email);
      const hasPasswordError = this.userService.validatePassword(password);

      if (hasEmailError || hasPasswordError) {
        return hasEmailError || hasPasswordError;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await this.userRepository.create({
        ...registerUserDto,
        hashPassword: hashedPassword,
      });

      user.save();
      return user;
    } catch (error) {
      console.error('Error registering user:', error);
      throw error;
    }
  }
}
