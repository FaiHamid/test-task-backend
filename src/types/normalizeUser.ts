export type TRole = 'user' | 'admin' | 'super admin';

export interface INormalizedUser {
  name: string;
  surname: string;
  email: string;
  avatar?: string;
}
