import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './roles.entity';

@Table({ tableName: 'users' })
export class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  name: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  surname: string;

  @Column({
    type: DataType.STRING(255),
    allowNull: false,
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  hashPassword: string;

  @Column({
    type: DataType.TEXT,
    defaultValue:
      'https://drive.google.com/uc?id=1_r1EryhdGp59FgxZL5ux0AIyFBh4adbV',
  })
  avatar: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  activationToken: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  accessesToken: string | null;

  @ForeignKey(() => Role)
  @Column
  idRole: number;
}
