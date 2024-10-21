import {
  Controller,
  Get,
  Req,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { Request, Response } from 'express';
import { CustomJwtService } from 'src/services/jwt.services';
import { TokensService } from 'src/services/tokens.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('refresh')
export class RefreshController {
  constructor(
    private readonly tokenService: TokensService,
    private readonly authService: AuthService,
    private readonly jwtService: CustomJwtService,
    private userService: UserService,
  ) {}

  @Get()
  async refresh(@Req() request: Request, @Res() res: Response) {
    const { refreshToken } = request.cookies;
    const userData = this.jwtService.validateRefreshToken(refreshToken);

    if (!userData) {
      throw new UnauthorizedException();
    }

    const token = await this.tokenService.getByToken(refreshToken);

    if (!token) {
      throw new UnauthorizedException();
    }

    const user = await this.userService.findOneByEmail(userData.email);

    await this.authService.sendAuthentication(user, res);

    return user;
  }
}
