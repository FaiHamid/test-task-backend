// import { TRole } from "src/types/normalizeUser";

export class RegisterUserDto {
  name: string;
  surname: string;
  email: string;
  password: string;
  activationToken: string;
  accessToken: string;
  idRole: number;
  avatar?: string;
}
