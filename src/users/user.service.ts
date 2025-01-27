import { INormalizedUser, IUserToChange } from 'src/types/normalizeUser';
import { User } from '../models/users.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Role } from 'src/models/roles.entity';
import * as bcrypt from 'bcrypt';
import { UserRegistrationException } from 'src/services/exception.service';

@Injectable()
export class UserService {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
  ) {}

  normalize({
    id,
    name,
    surname,
    email,
    avatar,
    accessToken,
  }: User): INormalizedUser {
    return { id, name, surname, email, avatar, accessToken };
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
    const resp = await this.userRepository.findOne({
      where: { accessToken },
    });

    return resp;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { email },
    });
  }

  async findOneById(id: number): Promise<User | undefined> {
    return await this.userRepository.findOne({
      where: { id },
    });
  }

  async getUserWithRole(email: string) {
    const user = await this.userRepository.findOne({
      where: { email },
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

  async updateUser(userId: number, userData: IUserToChange) {
    const user = await this.findOneById(userId);

    if (userData.hashPassword) {
      const isValidPassword = await bcrypt.compare(
        userData.password,
        user.hashPassword,
      );

      if (!isValidPassword) {
        throw new UserRegistrationException('Incorrect old password');
      }
      delete userData.password;
      const hashedPassword = await bcrypt.hash(userData.hashPassword, 10);
      userData.hashPassword = hashedPassword;
    }

    await this.userRepository.update(userData, {
      where: { id: userId },
    });

    const updatedUser = await this.findOneById(userId);

    return this.normalize(updatedUser);
  }
}
