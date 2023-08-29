import type { Metadata } from 'next'

import Heading from '@/ui/Heading'

import { NO_INDEX_PAGE } from '@/constants/seo.constants'

export const metadata: Metadata = {
	title: 'Спасибо!',
	...NO_INDEX_PAGE
}

export default function ThanksPage() {
	return <Heading>Спасибо!</Heading>
}
