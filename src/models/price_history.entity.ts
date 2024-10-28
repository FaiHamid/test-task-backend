import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { Company } from './companies.entity';

@Table({ tableName: 'price_history' })
export class PriceHistory extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column({
    type: DataType.DECIMAL(15, 2),
    allowNull: false,
  })
  price: number;

  @ForeignKey(() => Company)
  @Column
  companyid: number;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'updatedat',
  })
  updatedAt: Date;

  @Column({
    type: DataType.DATE,
    allowNull: false,
    defaultValue: DataType.NOW,
    field: 'createdat',
  })
  createdAt: Date;
}
