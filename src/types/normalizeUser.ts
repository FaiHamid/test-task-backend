export interface INormalizedUser {
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
