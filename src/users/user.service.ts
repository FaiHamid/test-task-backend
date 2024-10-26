import { INormalizedUser } from 'src/types/normalizeUser';
import { User } from '../models/users.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/models/roles.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
  ) {}

  normalize({
    name,
    surname,
    email,
    avatar,
    accessToken,
  }: User): INormalizedUser {
    return { name, surname, email, avatar, accessToken };
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
    const user = await this.userRepository.findOne({
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

  async findOneByActivationToken(
    activationToken: string,
  ): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { activationToken },
    });
  }

  async findOneByAccessToken(accessToken: string): Promise<User | undefined> {
    console.log('hello find');
    return await this.userRepository.findOne({
      where: { accessToken },
    });
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async getUserWithRole(userId: string) {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      include: [{ model: Role }],
    });
    return user;
  }

  async updateAccessToken(
    userId: number,
    accessToken: string | null,
  ): Promise<void> {
    await this.userRepository.update(
      { accessToken },
      { where: { id: userId } },
    );
  }
}
