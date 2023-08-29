import { getAdminUrl } from '@/config/url.config'

import { IMenuItem } from './menu.interface'

export const ADMIN_MENU: IMenuItem[] = [
	{
		label: 'Статистика',
		href: getAdminUrl()
	},
	{
		label: 'Продукты',
		href: getAdminUrl('/products')
	},
	{
		label: 'Категории',
		href: getAdminUrl('/categories')
	},
	{
		label: 'Комментарии',
		href: getAdminUrl('/reviews')
	},
	{
		label: 'Заказы',
		href: getAdminUrl('/orders')
	}
]
