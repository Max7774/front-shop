import { IUser } from '@/types/user.interface'

import { instance } from '@/api/api.interceptor'

const STATISTICS = 'statistics'

export type TypeStatisticsResponse = {
	allUsers: IUser[]
	statistic: {
		name: string
		value: number
	}[]
}

export const StatisticsService = {
	async getMain() {
		return instance<TypeStatisticsResponse>({
			url: `${STATISTICS}/main`,
			method: 'GET'
		})
	}
}
