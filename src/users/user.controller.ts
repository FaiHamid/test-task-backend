import { Controller, Get, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomJwtService } from 'src/services/jwt.services';
import { UserRegistrationException } from 'src/services/exception.service';

@Controller('users')
export class UserController {
  constructor(
    private userService: UserService,
    private jwtService: CustomJwtService,
  ) {}

  @Get(':token')
  async getUser(@Param() params: any) {
    const checkingValidToken = this.jwtService.validateAccessToken(
      params.token,
    );
    console.log('checkingValidToken', checkingValidToken);

    if (!checkingValidToken) {
      throw new UserRegistrationException('Token Expired');
    }
    const response = await this.userService.findOneByAccessToken(params.token);
    return this.userService.normalize(response);
  }
}
