import { Body, Controller, Get, Param, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { CustomJwtService } from 'src/services/jwt.services';
import { UserRegistrationException } from 'src/services/exception.service';
import { IUserToChange } from 'src/types/normalizeUser';

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

  @Put(':id')
  async updateUser(@Param() params: any, @Body() userData: IUserToChange) {
    return await this.userService.updateUser(params.id, userData);
  }
}
