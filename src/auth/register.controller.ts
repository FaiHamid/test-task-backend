import { v4 as uuidv4 } from 'uuid';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { AuthService } from './auth.service';
import { emailService } from 'src/services/email.service';
import { UserRegistrationException } from 'src/services/exception.service';

@Controller('register')
export class RegisterController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(
    @Body() registerUserDto: Omit<RegisterUserDto, 'activationToken'>,
  ) {
    const activationToken = uuidv4();
    const newUser = await this.authService.register({
      ...registerUserDto,
      activationToken,
    });

    if (typeof newUser === 'string') {
      throw new UserRegistrationException(newUser);
    }

    await emailService.sendActivationEmail(
      registerUserDto.email,
      activationToken,
    );

    return newUser;
  }
}
