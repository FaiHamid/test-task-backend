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

@Table({ tableName: 'sessions' })
export class Session extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refreshToken: string | null;

  @ForeignKey(() => User)
  @Column
  idUser: number;
}
