import { INormalizedUser } from 'src/types/normalizeUser';
import { User } from '../models/users.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  normalize({ name, surname, email, avatar }: User): INormalizedUser {
    return { name, surname, email, avatar };
  }

  validateEmail(email: string): string {
    const emailPattern = /^[\w.+-]+@([\w-]+\.){1,3}[\w-]{2,}$/;

    if (!email) return 'Email is required';
    if (!emailPattern.test(email)) return 'Email is not valid';
  }

  validatePassword(password: string): string {
    if (!password) return 'Password is required';
    if (password.length < 6) return 'At least 6 characters';
  }

  async activateUser(activationToken: string) {
    const user = await User.findOne({
      where: { activationToken },
    });

    if (!user) {
      // throw new NotFoundException('User not found');
      return;
    }

    user.activationToken = null;
    await user.save();

    return user;
  }
}
