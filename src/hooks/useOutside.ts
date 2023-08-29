import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react'

import styles from '../app/layout/header/cart/Cart.module.scss'

type TypeOut = {
	ref: any
	isShow: boolean
	setIsShow: Dispatch<SetStateAction<boolean>>
}

export const useOutside = (initialIsVisible: boolean): TypeOut => {
	const [isShow, setIsShow] = useState(initialIsVisible)
	const ref = useRef<HTMLElement>(null)

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShow(false)
			// document
			// 	.querySelector(`.${styles.cartWrapper}`)
			// 	?.classList.add(styles.reverse)
			// setTimeout(() => {
			// 	setIsShow(false)
			// }, 700)
		}
	}

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true)
		return () => {
			document.removeEventListener('click', handleClickOutside, true)
		}
	})
	return { ref, isShow, setIsShow }
}
