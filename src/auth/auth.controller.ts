import { v4 as uuidv4 } from 'uuid';
import {
  Body,
  Controller,
  Get,
  Inject,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { AuthService } from './auth.service';
import { MailService } from '../services/mail.service';
import { UserRegistrationException } from 'src/services/exception.service';
import { Role } from '../models/roles.entity';
import { UserService } from 'src/users/user.service';
import { IReqLoginUser } from 'src/types/normalizeUser';
import { AuthGuard } from '@nestjs/passport';
import { ERole } from 'src/types/roles.enum';
import { Request, Response } from 'express';
import { CustomJwtService } from 'src/services/jwt.services';
import { TokensService } from 'src/services/tokens.service';

@Controller()
export class AuthController {
  constructor(
    @Inject('ROLES_REPOSITORY') private rolesRepository: typeof Role,
    private readonly authService: AuthService,
    private readonly mailService: MailService,
    private userService: UserService,
    private jwtService: CustomJwtService,
    private tokenService: TokensService,
  ) {}

  @Post('register')
  async create(
    @Body() registerUserDto: Omit<RegisterUserDto, 'activationToken'>,
  ) {
    const activationToken = uuidv4();

    const role = await this.rolesRepository.findOne({
      where: { role: ERole.User },
    });
    const newUser = await this.authService.register({
      ...registerUserDto,
      activationToken,
      idRole: role.id,
    });

    if (typeof newUser === 'string') {
      throw new UserRegistrationException(newUser);
    }

    await this.mailService.sendActivationEmail(
      registerUserDto.email,
      newUser.activationToken,
    );

    return this.userService.normalize(newUser);
  }

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() loginUser: IReqLoginUser, @Res() res) {
    const responseUser = await this.authService.sendAuthentication(
      loginUser,
      res,
    );

    return res.json(responseUser);
  }

  @Post('logout')
  async logout(@Req() req: Request, @Res() res: Response) {
    return await this.authService.logout(req, res);
  }

  @Get('refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    return await this.authService.refresh(req, res);
  }
}
