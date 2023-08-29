import cn from 'clsx'
import { useMemo, useState } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'
import { animated, useTrail, useTransition } from 'react-spring'

import styles from './Select.module.scss'
import { ISelect } from './select.interface'

function Select<K>({ data, onChange, value, title }: ISelect<K>) {
	const [isOpen, setIsOpen] = useState(false)
	const transitions = useTransition(isOpen, {
		from: { transform: 'translateX(100%)', opacity: 0 },
		enter: { transform: 'translateX(0)', opacity: 1 },
		leave: { transform: 'translateX(100%)', opacity: 0 }
	})

	const trailData = useMemo(() => data, [data])

	const trail = useTrail(trailData.length, {
		from: { transform: 'translate3d(0,-40px,0)', opacity: 0 },
		to: { transform: 'translate3d(0,0px,0)', opacity: 1 }
	})

	return (
		<div className={styles.select}>
			<button onClick={() => setIsOpen(!isOpen)}>
				{title && <b>{title}:</b>}
				{value?.label || 'Default'}
				<BsCaretDownFill />
			</button>
			{transitions((style, item) =>
				item ? (
					<animated.ul style={style}>
						{trail.map((style, index) => (
							<animated.li
								style={style}
								key={data[index].key?.toString()}
								className={cn({
									[styles.active]: data[index].key === value?.key
								})}
							>
								<button
									onClick={() => {
										onChange(data[index])
										setIsOpen(false)
									}}
									disabled={data[index].key === value?.key}
								>
									{data[index].label}
								</button>
							</animated.li>
						))}
					</animated.ul>
				) : null
			)}
		</div>
	)
}

export default Select
