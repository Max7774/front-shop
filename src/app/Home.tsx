import { FC } from 'react'

import Carousel from '@/ui/carousel/Carousel'
import Catalog from '@/ui/catalog/Catalog'
import CategoryCatalog from '@/ui/category/CategoryCatalog'

import { TypePaginationProducts } from '@/types/product.interface'

import { carouselItems } from './carousel.data'

const Home: FC<TypePaginationProducts> = ({ products, categories }) => {
	return (
		<>
			<Carousel items={carouselItems} className='mb-10' />
			<CategoryCatalog
				title='Популярные категории ⭐'
				categories={categories}
			/>
			<Catalog title='Свежие товары 🔥' products={products} />
		</>
	)
}

export default Home
