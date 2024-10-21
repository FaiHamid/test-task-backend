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
