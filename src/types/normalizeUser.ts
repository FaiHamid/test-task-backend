export interface INormalizedUser {
  id: number;
  name: string;
  surname: string;
  email: string;
  accessToken: string;
  avatar?: string;
}

export interface IReqLoginUser {
  email: string;
  password: string;
}

export interface IUserToChange {
  name?: string;
  surname?: string;
  avatar?: string;
  hashPassword?: string;
  password?: string;
}
