import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
  Res,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/models/users.entity';
import { Response } from 'express';

@Controller('activate/:activationToken')
export class ActivateController {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async activate(
    @Param('activationToken') activationToken: string,
    @Res() res: Response,
  ) {
    const user =
      await this.usersService.findOneByActivationToken(activationToken);

    if (!user) {
      throw new NotFoundException('User not found or invalid activation token');
    }

    user.activationToken = null;
    await user.save();

    const resp = await this.authService.sendAuthentication(
      { email: user.email },
      res,
    );
    console.log('Sending response:', resp);

    return res.json(resp);
  }
}
