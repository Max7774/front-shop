'use client'

import Link from 'next/link'
import { FC } from 'react'
import { AiOutlineHeart } from 'react-icons/ai'
import { MdOutlineAdminPanelSettings } from 'react-icons/md'

import { useAuth } from '@/hooks/useAuth'
import { useIsAdminPanel } from '@/hooks/useIsAdminPanel'

import HeaderProfile from './HeaderProfile'
import Search from './Search'
import HeaderCart from './cart/HeaderCart'

const Header: FC = () => {
	const { isAdminPanel } = useIsAdminPanel()
	const { user } = useAuth()

	return (
		<header className='bg-secondary w-full py-6 px-6 grid grid-flow-col gap-4 items-center sm:grid-cols-1 md:grid-cols-3'>
			<Link href='/' prefetch={false}>
				{isAdminPanel ? (
					<h2 className='text-3xl text-white font-semibold'>Admin Panel</h2>
				) : (
					<h2 className='text-2xl text-primary text-decoration-line: underline font-semibold'>
						LongboardShop
					</h2>
				)}
			</Link>
			<Search />
			<div className='flex items-center justify-end gap-10'>
				{user?.isAdmin && !isAdminPanel && (
					<Link
						prefetch={false}
						href='/admin'
						className='hover:text-primary transition-colors duration-200 text-white inline-block text-lg'
					>
						<MdOutlineAdminPanelSettings size={29} />
					</Link>
				)}
				<Link href='/favorites' className='text-white' prefetch={false}>
					<AiOutlineHeart size={28} />
				</Link>
				<HeaderCart />
				<HeaderProfile />
			</div>
		</header>
	)
}

export default Header
