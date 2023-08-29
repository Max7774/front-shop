'use client'

import { useQuery } from '@tanstack/react-query'
import cn from 'clsx'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import Heading from '@/ui/Heading'
import Button from '@/ui/button/Button'
import Catalog from '@/ui/catalog/Catalog'

import { TypePaginationProducts } from '@/types/product.interface'

import styles from './ProductExplorer.module.scss'
import Filters from './filters/Filters'
import Pagination from './pagination/Pagination'
import SortDropdown from './sort/SortDropdown'
import { useFilters } from './useFilters'
import { ProductService } from '@/services/product/product.service'

interface IProductExplorer {
	initialProducts: TypePaginationProducts
}

const ProductExplorer: FC<IProductExplorer> = ({ initialProducts }) => {
	const [isFilterOpen, setIsFilterOpen] = useState(false)
	const [products, setProducts] =
		useState<TypePaginationProducts>(initialProducts)

	const { isFilterUpdated, queryParams, updateQueryParams } = useFilters()

	const { push } = useRouter()

	const { data, isFetching } = useQuery(
		['product explorer', queryParams],
		() => ProductService.getAll(queryParams),
		{
			initialData: initialProducts,
			enabled: isFilterUpdated
		}
	)

	useEffect(() => {
		if (isFilterUpdated) {
			const res = ProductService.getAll(queryParams)
			res
				.then((result: TypePaginationProducts) => setProducts(result))
				.catch(console.log)
		}
	}, [isFilterUpdated, queryParams])

	return (
		<>
			<div className='flex items-center justify-between mb-7'>
				<Heading>
					{queryParams.searchTerm ? (
						<>
							{`Результаты поиска по названию "${queryParams.searchTerm}"`}
							<Button
								onClick={() => {
									push('/explorer')
									updateQueryParams('searchTerm', '')
								}}
								className='ml-10'
								size='sm'
								variant='orange'
							>
								Очистить поиск
							</Button>
						</>
					) : (
						'Все товары'
					)}
				</Heading>
				<SortDropdown />
			</div>

			<Button
				variant='white'
				onClick={() => setIsFilterOpen(!isFilterOpen)}
				className='mb-7'
			>
				{isFilterOpen ? 'Закрыть' : 'Открыть'} фильтры
			</Button>

			<div
				className={cn(styles.explorer, {
					[styles.filterOpened]: isFilterOpen
				})}
			>
				<aside>
					<Filters />
				</aside>

				<section>
					<Catalog products={products.products} isLoading={isFetching} />
					<Pagination
						changePage={page => updateQueryParams('page', page.toString())}
						currentPage={queryParams.page}
						numberPages={data.length / +queryParams.perPage}
					/>
				</section>
			</div>
		</>
	)
}

export default ProductExplorer
