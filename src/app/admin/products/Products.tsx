'use client'

import { FC } from 'react'

import Heading from '@/ui/Heading'
import AdminList from '@/ui/admin/admin-list/AdminList'

import AdminPanel from './CreateProductForm'
import { useAdminProducts } from './useAdminProducts'

const Products: FC = () => {
	const { data, isFetching, deleteProductMutation, addProductMutation } =
		useAdminProducts()

	return (
		<>
			<Heading className='mb-7'>Товары</Heading>
			<AdminPanel addHandler={addProductMutation} />
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={deleteProductMutation}
			/>
		</>
	)
}

export default Products
