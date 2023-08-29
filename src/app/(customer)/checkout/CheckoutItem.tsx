import Image from 'next/image'
import { FC } from 'react'

import { IProduct } from '@/types/product.interface'

import { convertPrice } from '@/utils/convertPrice'

import styles from './Checkout.module.scss'

const CheckoutItem: FC<{ product: IProduct; quantity: number }> = ({
	product,
	quantity
}) => {
	return (
		<div className={styles.item}>
			<Image
				src={product.images[0]}
				width={100}
				height={100}
				alt={product.name}
			/>
			<div className={styles.row}>
				<div className={styles.information}>
					<div>{product.name}</div>
					<div>{product.category.name}</div>
				</div>
				<div>{`Кол-во: ${quantity} шт.`}</div>
				<div className={styles.price}>{convertPrice(product.price)}</div>
			</div>
		</div>
	)
}

export default CheckoutItem
