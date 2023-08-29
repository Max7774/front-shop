import React, { FC } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'

import { CategoryType } from '@/types/category.interface'

const CategoryCreate: FC<{
	addHandler: (data: CategoryType) => void
}> = ({ addHandler }) => {
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<CategoryType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<CategoryType> = async data => {
		addHandler(data)
		reset()
	}

	return (
		<form onSubmit={handleSubmit(onSubmit)}>
			<Field
				{...register('name')}
				placeholder='Название категории'
				error={errors.name?.message}
			/>
			<Button className='flex mt-5' type='submit' variant='orange'>
				Создать категорию
			</Button>
		</form>
	)
}

export default CategoryCreate
