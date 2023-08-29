import type { Metadata } from 'next'

import Home from '@/app/Home'
import { CategoryService } from '@/services/category.service'
import { ProductService } from '@/services/product/product.service'

export const metadata: Metadata = {
	description: 'Магазин лонгбордов по России!'
}

export const revalidate = 60

async function getProducts() {
	const data = await ProductService.getAll({
		page: 1,
		perPage: 4,
		ratings: ''
	})
	const categories = await CategoryService.getAll()

	return { data, categories, revalidate: 20 }
}

export default async function HomePage() {
	const { data, categories } = await getProducts()

	return (
		<Home
			products={data.products}
			categories={categories.data}
			length={data.length}
		/>
	)
}
