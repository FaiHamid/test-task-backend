import { Inject, Injectable, Req, Res } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { User } from 'src/models/users.entity';
import { UserService } from 'src/users/user.service';
import { CustomJwtService } from 'src/services/jwt.services';
import { Session } from 'src/models/sessions.entity';
import { Request, Response } from 'express';
import { TokensService } from 'src/services/tokens.service';
import { UserRegistrationException } from 'src/services/exception.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('SESSION_REPOSITORY')
    private readonly sessionRepository: typeof Session,
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private userService: UserService,
    private jwtService: CustomJwtService,
    private tokenService: TokensService,
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
    const user = await this.userService.findOneByEmail(email.trim());

    if (!user) {
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
    const userData = await this.userService.findOneByEmail(user.email);

    const accessToken = this.jwtService.generateAccessToken(user);
    const refreshToken = this.jwtService.generateRefreshToken(user);

    await this.sessionRepository.create({
      iduser: userData.id,
      refreshtoken: refreshToken,
    });

    userData.accessToken = accessToken;
    await userData.save();

    res.cookie('refreshToken', refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    });

    return await this.userService.normalize(userData);;
  }

  async logout(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;

    const userEmail = await this.jwtService.validateRefreshToken(refreshToken);
    const userData = await this.userService.findOneByEmail(userEmail?.email);

    res.clearCookie('refreshToken');

    if (userData) {
      await this.userService.updateAccessToken(userData.id, null);
      await this.tokenService.removeToken(userData.id.toString());
    }

    res.sendStatus(204);
  }

  async refresh(@Req() req: Request, @Res() res: Response) {
    const { refreshToken } = req.cookies;
    const userData = this.jwtService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new UserRegistrationException('Don`t have refresh token');
    }

    const token = await this.tokenService.getByToken(refreshToken);

    if (!token) {
      throw new UserRegistrationException('Don`t have refresh token');
    }

    const user = await this.userService.findOneByEmail(userData.email);

    return await this.sendAuthentication(user, res);
  }
}
