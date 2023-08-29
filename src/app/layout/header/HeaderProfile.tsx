'use client'

import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

import { useOutside } from '@/hooks/useOutside'
import { useProfile } from '@/hooks/useProfile'

const HeaderProfile: FC = () => {
	const { profile } = useProfile()
	const { isShow, ref, setIsShow } = useOutside(false)

	if (!profile?.avatarPath) return null

	return (
		<div className='relative' ref={ref}>
			<button onClick={() => setIsShow(!isShow)}>
				<div style={{ width: '43px', height: '43px', position: 'relative' }}>
					<Image
						width={43}
						height={43}
						src={profile?.avatarPath}
						alt='profile'
						quality={100}
						unoptimized
						className='rounded-full border-primary border border-solid animate-opacity'
					/>
				</div>
			</button>
			{isShow && (
				<div
					className='absolute w-40 right-2 z-20'
					style={{
						top: 'calc(100% + 1rem)'
					}}
				>
					<Link
						href='/my-orders'
						className='bg-white shadow py-2 px-4 block w-full rounded-md hover:text-primary duration-300 transition-colors'
						prefetch={false}
					>
						Мои заказы
					</Link>
				</div>
			)}
		</div>
	)
}

export default HeaderProfile
