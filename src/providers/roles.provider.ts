import { Role } from '../models/roles.entity';

export const rolesProviders = [
  {
    provide: 'ROLES_REPOSITORY',
    useValue: Role,
  },
];
