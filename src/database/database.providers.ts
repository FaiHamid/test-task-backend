import { Sequelize } from 'sequelize-typescript';
import { User } from '../models/users.entity';
import { Role } from '../models/roles.entity';
import { Session } from '../models/sessions.entity';
import { Company } from '../models/companies.entity';
import * as dotenv from 'dotenv';

dotenv.config();

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        dialectOptions: {
          ssl: {
            require: true,
            rejectUnauthorized: false,
          },
        },
      });
      sequelize.addModels([User, Role, Session, Company]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
