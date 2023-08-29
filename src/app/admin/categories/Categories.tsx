'use client'

import { FC } from 'react'

import Heading from '@/ui/Heading'
import AdminList from '@/ui/admin/admin-list/AdminList'

import CategoryCreate from './CategoryCreate'
import { useAdminCategories } from './useAdminCategories'

const Categories: FC = () => {
	const { data, isFetching, deleteCategoryMutation, addCategoryMutation } =
		useAdminCategories()

	return (
		<>
			<Heading className='mb-7'>Категории</Heading>
			<CategoryCreate addHandler={addCategoryMutation} />
			<AdminList
				isLoading={isFetching}
				listItems={data}
				removeHandler={deleteCategoryMutation}
			/>
		</>
	)
}

export default Categories
