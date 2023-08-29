'use client'

import cn from 'clsx'
import Link from 'next/link'
import { FC, useEffect } from 'react'
import { RiShoppingCartLine } from 'react-icons/ri'

import SquareButton from '@/ui/button/SquareButton'

import { useCart } from '@/hooks/useCart'
import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

import { convertPrice } from '@/utils/convertPrice'

import styles from './Cart.module.scss'
import CartItem from './cart-item/CartItem'

const Cart: FC = () => {
	const { isShow, setIsShow, ref } = useOutside(false)

	const { profile } = useProfile()

	const { items, total } = useCart()

	return (
		<div className='relative' ref={ref}>
			<SquareButton
				Icon={RiShoppingCartLine}
				onClick={() => {
					if (isShow) {
						document
							.querySelector(`.${styles.cartWrapper}`)
							?.classList.add(styles.reverse)
						setTimeout(() => setIsShow(false), 700)
					} else {
						setIsShow(true)
					}
				}}
				number={items.length}
			/>

			{isShow && (
				<div className={cn(isShow ? styles.cartWrapper : styles.reverse)}>
					<div className='font-normal text-lg mb-5'>Моя корзина</div>

					<div className={styles.cart}>
						{items.length ? (
							items.map(item => <CartItem item={item} key={item.id} />)
						) : (
							<div className='font-light'>Корзина пуста!</div>
						)}
					</div>
					<div className={styles.footer}>
						<div>Общая сумма:</div>
						<div>{convertPrice(total)}</div>
					</div>
					{!!items.length && (
						<div className='text-center mt-7 mb-5'>
							<Link
								className='btn btn-white'
								href='/checkout'
								onClick={() => setIsShow(false)}
								prefetch={false}
							>
								Оформить заказ
							</Link>
						</div>
					)}
				</div>
			)}
		</div>
	)
}

export default Cart
