import cn from 'clsx'
import React, { FC, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import Button from '@/ui/button/Button'
import Field from '@/ui/input/Field'

import { useAdminCategories } from '../categories/useAdminCategories'

import Notification from './Notification'
import { ProductType } from '@/services/product/product.types'

const AdminPanel: FC<{ addHandler: (data: any) => void }> = ({
	addHandler
}) => {
	const [files, setFiles] = useState<File[]>([])
	const [previewPhoto, setPreviewPhoto] = useState<string[]>([])
	const { data } = useAdminCategories()

	const [open, setOpen] = useState(false)

	const handleClick = () => {
		setOpen(true)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset
	} = useForm<ProductType>({ mode: 'onChange' })

	const onSubmit: SubmitHandler<ProductType> = async data => {
		data.file = files
		addHandler(data)
		reset()
		setPreviewPhoto([])
		setFiles([])
		handleClick()
	}

	return (
		<>
			<section>
				<>
					<form onSubmit={handleSubmit(onSubmit)}>
						<Field {...register('name')} placeholder='Название товара' />
						<Field {...register('description')} placeholder='Описание' />
						<Field
							type='number'
							{...register('price', {
								valueAsNumber: true
							})}
							placeholder='Цена'
							error={errors.price?.message}
						/>
						<span className='mb-1 block'>Категории</span>
						<select
							{...register('categoryId')}
							className={cn(
								'px-4 py-2 w-full outline-none border border-gray border-solid focus:border-primary transition-all placeholder:text-gray rounded-lg'
							)}
							defaultValue={'Выберите категорию'}
						>
							<option value='Выберите категорию' disabled>
								Выберите категорию
							</option>
							{data?.map((el: any) => (
								<>
									<option key={el.id} value={el.id}>
										{el.items[0]}
									</option>
								</>
							))}
						</select>
						<Field
							className='block'
							onChange={(e: any) => {
								if (e.target.files[0] !== null) {
									setFiles(prev => [...prev, e.target.files[0]])
									let reader = new FileReader()
									reader.onloadend = () => {
										setPreviewPhoto(prev => [...prev, String(reader.result)])
									}
									reader.readAsDataURL(e!.target!.files[0])
								}
							}}
							type='file'
							placeholder='Скачать фото'
						/>
						{previewPhoto.length !== 0 ? (
							<div className='grid grid-cols-9 gap-5'>
								{previewPhoto.map(img => (
									<div className='animate-scaleIn'>
										<img
											style={{
												borderRadius: '10px',
												border: '2px solid orange'
											}}
											className='m-2'
											width={150}
											height={150}
											src={img}
											alt='...'
										/>
									</div>
								))}
							</div>
						) : null}
						<Button className='mt-5' type='submit' variant='orange'>
							Создать товар
						</Button>
					</form>
					<Notification
						setOpen={setOpen}
						open={open}
						handleClick={handleClick}
					/>
				</>
			</section>
		</>
	)
}

export default AdminPanel
