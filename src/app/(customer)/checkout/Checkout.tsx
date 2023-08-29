'use client'

import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'

import Heading from '@/ui/Heading'
import Button from '@/ui/button/Button'
import ProductItem from '@/ui/catalog/product-item/ProductItem'

import { useActions } from '@/hooks/useActions'
import { useCart } from '@/hooks/useCart'
import { useProfile } from '@/hooks/useProfile'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import styles from './Checkout.module.scss'
import CheckoutItem from './CheckoutItem'
import { OrderService } from '@/services/order.service'

const Checkout: FC<{ products: IProduct[] }> = ({ products = [] }) => {
	const [recommendedProducts, setRecommendedProducts] = useState<IProduct[]>([])

	const { items, total } = useCart()
	const { profile } = useProfile()

	const { reset } = useActions()

	const { push, replace } = useRouter()

	const { mutate } = useMutation(
		['create order and payment'],
		() =>
			OrderService.place({
				items: items.map(item => ({
					price: item.price,
					quantity: item.quantity,
					productId: item.product.id
				}))
			}),
		{
			onSuccess({ data }) {
				reset()
				push(data.confirmation.confirmation_url)
			}
		}
	)

	useEffect(() => {
		const itemsInCartIds = items.map(item => item.product.id)
		const filteredProducts = products.filter(
			product => !itemsInCartIds.includes(product.id)
		)
		const randomProducts = filteredProducts
			.sort(() => Math.random() - 0.5)
			.slice(0, 4)
		setRecommendedProducts(randomProducts)
	}, [items, products])

	return (
		<>
			{items.length ? (
				<section className={styles.checkout}>
					<div>
						<Heading className='mb-6'>Оформление заказа</Heading>
						<div className={styles.list}>
							{items.map(item => (
								<CheckoutItem
									key={item.id}
									product={item.product}
									quantity={item.quantity}
								/>
							))}
						</div>
						<div className={styles.footer}>
							<div className={styles.total}>
								<div>Общая сумма</div>
								<div>{convertPrice(total)}</div>
							</div>
							<Button
								variant='white'
								size='lg'
								className='mt-5 mb-2'
								onClick={() => {
									if (profile !== undefined) {
										mutate()
									} else {
										replace('/auth')
									}
								}}
							>
								Оплатить
							</Button>
						</div>
					</div>
					<div className={styles.divider}></div>
					<div>
						<Heading className='mb-6 text-2xl'>Рекомендации</Heading>
						<div className={`${styles.recommended} laptop: grid-cols-2`}>
							{recommendedProducts.map(product => (
								<ProductItem product={product} key={product?.id} />
							))}
						</div>
					</div>
				</section>
			) : (
				<div>Заполните корзину!</div>
			)}
		</>
	)
}

export default Checkout
