import React, { FC } from 'react'
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from 'recharts'

import { IUser } from '@/types/user.interface'

const Chart: FC<{ users: IUser[] | undefined }> = ({ users }) => {
	const data1: any = users?.reduce(
		(acc: { name: string; uv: number }[], user: any) => {
			const newUserDate = new Date(String(user.createdAt)).toLocaleDateString()
			const existingData = acc.find((data: any) => data.name === newUserDate)

			if (existingData) {
				existingData.uv += 1
			} else {
				acc.push({ name: newUserDate, uv: 1 })
			}

			return acc
		},
		[]
	)

	const data = [
		{ name: '20.03.2023', uv: 0 },
		{ name: '13.04.2023', uv: 1 },
		...(data1?.length > 0 ? data1 : [])
	]

	return (
		<LineChart width={600} height={300} data={data} className='mt-10'>
			<Line type='monotone' dataKey='uv' stroke='#8884d8' />
			<CartesianGrid stroke='#ccc' />
			<XAxis dataKey='name' />
			<YAxis />
		</LineChart>
	)
}

export default Chart
