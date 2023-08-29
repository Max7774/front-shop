import { useRouter } from 'next/navigation'
import { FC, useEffect, useState } from 'react'
import { BsSearch } from 'react-icons/bs'

import { useFilters } from '@/app/explorer/useFilters'

const Search: FC = () => {
	const [searchTerm, setSearchTerm] = useState<string>('')

	const { updateQueryParams } = useFilters()

	const { push, replace } = useRouter()

	useEffect(() => {
		const input = document.getElementById('searchInput')
		input?.addEventListener('keyup', function (event) {
			if (event.code === 'Enter') {
				const text = document.getElementsByTagName('input')[0].value
				push(`/explorer?searchTerm=${text}`)
				updateQueryParams('searchTerm', text)
				replace(`/explorer?searchTerm=${text}`)
			}
		})
	}, [])

	return (
		<div>
			<div
				className='border border-solid border-gray/10 grid w-full sm:w-1/2 md:w-1/3 rounded-xl overflow-hidden'
				style={{
					gridTemplateColumns: '1fr 0.1fr'
				}}
			>
				<input
					className='bg-[#22303E] text-sm py-2 px-4 text-white outline-none'
					value={searchTerm}
					id='searchInput'
					onChange={e => setSearchTerm(e.target.value)}
					placeholder='Поиск...'
				/>
				<button
					onClick={() => {
						push(`/explorer?searchTerm=${searchTerm}`)
						updateQueryParams('searchTerm', searchTerm)
						replace(`/explorer?searchTerm=${searchTerm}`)
					}}
					className='bg-primary text-white flex items-center justify-center p-2.5'
				>
					<BsSearch />
				</button>
			</div>
		</div>
	)
}

export default Search
