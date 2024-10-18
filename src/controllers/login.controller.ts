import { Controller, Post } from '@nestjs/common';

@Controller('login')
export class LoginController {
  @Post()
  create(): string {
    return 'This action adds a new cat';
  }
}
