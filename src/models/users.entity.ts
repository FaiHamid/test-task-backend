import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  DataType,
  ForeignKey,
  BelongsTo,
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
    defaultValue: 'https://i.imgur.com/aX3x1wT.png',
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
    field: 'accesstoken',
  })
  accessToken: string | null;

  @ForeignKey(() => Role)
  @Column
  idRole: number;

  @BelongsTo(() => Role)
  role: Role;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
