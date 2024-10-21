import {
  Controller,
  Get,
  Inject,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { UserService } from 'src/users/user.service';
import { AuthService } from '../auth/auth.service';
import { User } from 'src/models/users.entity';

@Controller('activate/:activationToken')
export class ActivateController {
  constructor(
    @Inject('USERS_REPOSITORY') private userRepository: typeof User,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  async activate(@Param('activationToken') activationToken: string) {
    const user =
      await this.usersService.findOneByActivationToken(activationToken);
    const user2 = await this.userRepository.findOne({
      where: { activationToken },
    });
    console.log('server user:', user);
    console.log('server user2:', user2);
    console.log('server activationToken:', activationToken);

    if (!user) {
      throw new NotFoundException('User not found or invalid activation token');
    }

    user.activationToken = null;
    await user.save();

    return this.usersService.normalize(user);
  }
}
