import axios from 'axios'
import Cookies from 'js-cookie'

export const FileService = {
	async uploadFile(files: any, productID: number) {
		const accessToken = Cookies.get('accessToken')

		try {
			const formData = new FormData()
			for (let i = 0; i < files.length; i += 1) {
				formData.append(`files`, files[i])
			}
			await axios.post(
				`${process.env.SERVER_URL}/file-upload/create/${productID}`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
						Authorization: `Bearer ${accessToken}`
					}
				}
			)
		} catch (err) {
			console.log('ERRRRROROROOR', err)
		}
	}
}
