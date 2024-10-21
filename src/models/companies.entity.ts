import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from './users.entity';

@Table({ tableName: 'companies' })
export class Company extends Model {
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
    type: DataType.STRING(255),
    allowNull: false,
  })
  service: string;

  @Column({
    type: DataType.TEXT,
    defaultValue:
      'https://drive.google.com/uc?id=1_S3QcBikoS4cngAwaXCule5IFMsw_MPx',
  })
  logotype: string;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  createdAt: Date;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  longitude: string | null;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  latitude: string | null;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  capital: number;

  @ForeignKey(() => User)
  @Column
  idUser: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
  })
  updatedAt: Date;
}
