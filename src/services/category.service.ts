import { CategoryType, ICategory } from '@/types/category.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

const CATEGORIES = 'categories'

export const CategoryService = {
	async getAll() {
		return axiosClassic<ICategory[]>({
			url: CATEGORIES,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		return axiosClassic<ICategory>({
			url: `${CATEGORIES}/by-slug/${slug}`,
			method: 'GET'
		})
	},

	async create(data: CategoryType) {
		try {
			const response = await instance<CategoryType>({
				url: CATEGORIES,
				method: 'POST',
				data
			})

			if (response.status !== 200) {
				throw new Error('Failed to create product!')
			}

			return response.data
		} catch (error) {
			console.error(error)
			throw new Error('Failed to create product!')
		}
	},

	async update(id: string | number, name: string) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'PUT',
			data: { name }
		})
	},

	async delete(id: string | number) {
		return instance<ICategory>({
			url: `${CATEGORIES}/${id}`,
			method: 'DELETE'
		})
	}
}
