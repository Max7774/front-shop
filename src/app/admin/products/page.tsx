import Products from './Products'
import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata = {
	title: 'Товары',
	...NO_INDEX_PAGE
}

export default function ProductPage() {
	return <Products />
}
