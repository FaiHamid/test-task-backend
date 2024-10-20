import { v4 as uuidv4 } from 'uuid';
import { Body, Controller, Inject, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/users/dto/create-register.dto';
import { AuthService } from './auth.service';
import { MailService } from '../services/mail.service';
import { UserRegistrationException } from 'src/services/exception.service';
import { Role } from '../models/roles.entity';

@Controller('register')
export class RegisterController {
  constructor(
    @Inject('ROLES_REPOSITORY') private rolesRepository: typeof Role,
    private readonly authService: AuthService,
    private readonly mailService: MailService
  ) {}

  @Post()
  async create(
    @Body() registerUserDto: Omit<RegisterUserDto, 'activationToken'>,
  ) {
    const activationToken = uuidv4();
    const role = await this.rolesRepository.findOne({ where: { role: 'user' } }); 
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
      activationToken,
    );

    return newUser;
  }
}
