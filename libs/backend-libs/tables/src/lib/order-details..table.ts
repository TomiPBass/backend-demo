import {
	IOrderDetailsAttributes,
	IOrderDetailsCreationAttributes,
} from '@backend-demo/backend-libs/entities';
import {
	OrderDetailsForeignKey,
	OrderForeignKey,
} from '@backend-demo/backend-libs/foreign-keys';
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
} from 'sequelize-typescript';
import { Order } from './order.table';

// HOMEWORK: Co je singleton class?
export class OrderDetails
	extends Model<IOrderDetailsAttributes, IOrderDetailsCreationAttributes>
	implements IOrderDetailsAttributes
{
	@Column({
		type: DataType.UUID,
		allowNull: false,
		primaryKey: true,
	})
	code!: string;

	@Column({
		type: DataType.NUMBER,
		allowNull: false,
	})
	quantity!: number;

	@Column({
		type: DataType.BOOLEAN,
		allowNull: false,
	})
	canBeDeliveredSeparately!: boolean;

	@ForeignKey(() => Order)
	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	OrderCode!: string;

	@Column({
		type: DataType.UUID,
		allowNull: false,
	})
	ProductCode!: string;

	@BelongsTo(() => Order, OrderDetailsForeignKey.belongsTo(OrderForeignKey))
	Order?: Order;
}
