import { v4 as uuidv4 } from 'uuid';
import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { AuthService } from './auth.service';
import { emailService } from 'src/services/email.service';

@Controller('activation/:activationToken')
export class ActivateController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async create(@Body() registerUserDto: RegisterUserDto) {
    console.log('registerUserDto', registerUserDto);
    const newUser = await this.authService.register(registerUserDto);
    const token = uuidv4();

    await emailService.sendActivationEmail(registerUserDto.email, token);
    return newUser;
  }
}
