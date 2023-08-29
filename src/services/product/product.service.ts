import { IProduct, TypePaginationProducts } from '@/types/product.interface'

import { axiosClassic, instance } from '@/api/api.interceptor'

import { FileService } from '../file.service'

import {
	PRODUCTS,
	ProductType,
	TypeProductData,
	TypeProductDataFilters
} from './product.types'

export const ProductService = {
	async getAll(queryData = {} as TypeProductDataFilters) {
		const { data } = await axiosClassic<TypePaginationProducts>({
			url: PRODUCTS,
			method: 'GET',
			params: queryData
		})

		return data
	},

	async getSimilar(id: string | number) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/similar/${id}`,
			method: 'GET'
		})
	},

	async getBySlug(slug: string) {
		const { data } = await axiosClassic<IProduct>({
			url: `${PRODUCTS}/by-slug/${slug}`,
			method: 'GET'
		})

		return data
	},

	async getByCategory(categorySlug: string) {
		return axiosClassic<IProduct[]>({
			url: `${PRODUCTS}/by-category/${categorySlug}`,
			method: 'GET'
		})
	},

	async getById(id: string | number) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'GET'
		})
	},

	async createProduct(income: ProductType) {
		try {
			const data = {
				name: income.name,
				price: income.price,
				description: income.description,
				categoryId: income.categoryId
			}
			const response = await instance<IProduct>({
				url: `${PRODUCTS}/create`,
				method: 'POST',
				data
			})

			if (response.status !== 200) {
				throw new Error('Failed to create product!')
			}

			await FileService.uploadFile(income.file, response.data.id)

			return response.data
		} catch (error) {
			console.error(error)
			throw new Error('Failed to create product!')
		}
	},

	async update(id: string | number, data: TypeProductData) {
		return instance<IProduct>({
			url: `${PRODUCTS}/${id}`,
			method: 'PUT',
			data
		})
	},

	async deleteProduct(id: string | number) {
		try {
			return await instance<IProduct>({
				url: `${PRODUCTS}/${id}`,
				method: 'DELETE'
			})
		} catch (error) {
			console.error(error)
			throw new Error('Failed to delete product')
		}
	}
}
