import { Inject, Injectable, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { User } from 'src/models/users.entity';
import { UserService } from 'src/users/user.service';
import { CustomJwtService } from 'src/services/jwt.services';
import { Session } from 'src/models/sessions.entity';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepository: typeof Session,
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private userService: UserService,
    private jwtService: CustomJwtService,
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

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    console.log('I`m here');

    if (!user) {
      console.log(`User not found for email: ${email}`);
      return null;
    }

    const isValidPassword = await bcrypt.compare(pass, user.hashPassword);

    if (isValidPassword) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { hashPassword, ...result } = user;
      return result;
    }

    return null;
  }

  async sendAuthentication(user: any, @Res() res: Response) {
    console.log(user);
    const userData = await this.userService.findOneByEmail(user.email);

    const accessToken = this.jwtService.generateAccessToken(user);
    const refreshToken = this.jwtService.generateRefreshToken(user);

    await this.sessionRepository.create({
      iduser: userData.id,
      refreshtoken: refreshToken,
    });

    console.log('her1e');
    userData.accessToken = accessToken;
    await userData.save();
    console.log('her2e');
    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });
    console.log('her3e');
    const normUser = this.userService.normalize(userData);
    console.log('normUser', normUser);
    return normUser;
  }
}
