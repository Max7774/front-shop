'use client'

import { useQuery } from '@tanstack/react-query'
import { FC } from 'react'

import Heading from '@/ui/Heading'
import Loader from '@/ui/Loader'

import { convertPrice } from '@/utils/convertPrice'

import Chart from './Chart'
import styles from './Dashboard.module.scss'
import { StatisticsService } from '@/services/statistics.service'

const Dashboard: FC = () => {
	const { data, isFetching } = useQuery(
		['statistics'],
		() => StatisticsService.getMain(),
		{
			select: ({ data }) => data
		}
	)

	return (
		<>
			<Heading className='mb-8'>Статистика</Heading>
			{isFetching ? (
				<Loader />
			) : data?.statistic?.length ? (
				<div className={styles.wrapper}>
					{data.statistic.map((item, index) => (
						<div key={item.name} className={styles.item}>
							<div>{item.name}</div>
							<div>
								{index === data.statistic.length - 1
									? convertPrice(item.value || 0)
									: item.value}
							</div>
						</div>
					))}
				</div>
			) : (
				<div>Статистика не загрузилась!</div>
			)}
			<Heading className='mb-8 mt-5'>Количество пользователей</Heading>
			<Chart users={data?.allUsers} />
		</>
	)
}

export default Dashboard
