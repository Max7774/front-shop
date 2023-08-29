'use client'

import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import Heading from '../Heading'
import Loader from '../Loader'

import ProductItem from './product-item/ProductItem'

interface ICatalog {
	products: IProduct[]
	isLoading?: boolean
	title?: string
}

const Catalog: FC<ICatalog> = ({ products, isLoading, title }) => {
	if (isLoading) return <Loader />

	return (
		<section>
			{title && <Heading className='mb-5'>{title}</Heading>}
			{products.length ? (
				<>
					<div className='grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-10'>
						{products.map(product => (
							<ProductItem key={product.id} product={product} />
						))}
					</div>
				</>
			) : (
				<div>Упс, тут ничего нет!</div>
			)}
		</section>
	)
}

export default Catalog
