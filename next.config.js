/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	env: {
		SERVER_URL: process.env.SERVER_URL,
		APP_URL: process.env.APP_URL
	},
	images: {
		unoptimized: true,
		minimumCacheTTL: 60,
		disableStaticImages: true,
		domains: [
			'loremflickr.com',
			'localhost',
			'www.aptronixindia.com',
			'cloudflare-ipfs.com',
			'avatars.githubusercontent.com',
			'www.longboardshop-russia.ru'
		]
	},
	async rewrites() {
		return [
			{
				source: '/uploads/:path*',
				destination: 'https://www.longboardshop-russia.ru/uploads/:path*'
			}
		]
	}
}

module.exports = nextConfig
