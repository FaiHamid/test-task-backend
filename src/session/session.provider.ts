import { Session } from 'src/models/sessions.entity';

export const sessionsProviders = [
  {
    provide: 'SESSION_REPOSITORY',
    useValue: Session,
  },
];
