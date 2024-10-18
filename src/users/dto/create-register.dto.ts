export class RegisterUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  activationToken: string;
  avatar?: string;
}
