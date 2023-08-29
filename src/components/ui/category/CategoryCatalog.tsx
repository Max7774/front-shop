'use client'

import Image from 'next/image'
import Link from 'next/link'
import React, { FC } from 'react'

import { ICategory } from '@/types/category.interface'

import Heading from '../Heading'
import Loader from '../Loader'

import { categoryImages, convertToSlug } from './category.data.img'

interface CategoryCatalogProps {
	categories?: ICategory[]
	isLoading?: boolean
	title?: string
}

const CategoryCatalog: FC<CategoryCatalogProps> = ({
	categories,
	isLoading,
	title
}) => {
	if (isLoading) return <Loader />

	return (
		<section className='mb-8'>
			{title && <Heading className='mb-5'>{title}</Heading>}
			{categories?.length ? (
				<>
					<div className='grid grid-cols-2 tablet:grid-cols-4 laptop:grid-cols-7 desktop:grid-cols-7 gap-10'>
						{categoryImages.map(el => (
							<Link href={`/category/${convertToSlug(el.category)}`}>
								<div className='animate-scaleIn'>
									<Image
										className='bg-white rounded-2xl'
										width={80}
										height={80}
										src={el.src}
										alt='...'
										priority
										draggable={false}
										quality={100}
										unoptimized
									/>
								</div>
							</Link>
						))}
					</div>
				</>
			) : (
				<div>Упс, тут ничего нет!</div>
			)}
		</section>
	)
}

export default CategoryCatalog
