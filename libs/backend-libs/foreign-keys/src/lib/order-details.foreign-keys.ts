import { ConstraintRule } from './base/constraint-rule.enum';
import {
	DefaultBelongsToOptions,
	TableForeignKey,
} from './base/table-foreign-key';
import {
	ORDER_DETAILS_ALIAS,
	ORDER_DETAILS_CODE_ALIAS,
} from '@backend-demo/shared/constants';

export class OrderDetailsForeignKey extends TableForeignKey {
	static override readonly params: DefaultBelongsToOptions = {
		as: { plural: ORDER_DETAILS_ALIAS, singular: null },
		foreignKey: ORDER_DETAILS_CODE_ALIAS,
		onDelete: ConstraintRule.CASCADE,
		onUpdate: ConstraintRule.CASCADE,
	};
}
