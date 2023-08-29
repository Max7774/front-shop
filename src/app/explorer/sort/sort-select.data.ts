import { ISelectItem } from '@/ui/select/select.interface'

import { EnumProductSort } from '@/services/product/product.types'

export const SORT_SELECT_DATA: ISelectItem<EnumProductSort>[] = [
	{
		key: EnumProductSort.HIGH_PRICE,
		label: 'Высокая цена'
	},
	{
		key: EnumProductSort.LOW_PRICE,
		label: 'Низкая цена'
	},
	{
		key: EnumProductSort.NEWEST,
		label: 'Новые'
	},
	{
		key: EnumProductSort.OLDEST,
		label: 'Старые'
	}
]
