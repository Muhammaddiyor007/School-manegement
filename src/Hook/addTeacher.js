import { useState } from 'react'
import apiAxios from '../Api/Api'

const usePostAdd = url => {
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(null)
	const [data, setData] = useState(null)

	const postData = async (newData, withImage = false) => {
		setLoading(true)
		setError(null)

		try {
			let finalData = newData

			if (withImage) {
				const formdata = new FormData()
				for (let key in newData) {
					formdata.append(key, newData[key])
				}

				const imageRes = await apiAxios.get(
					'https://skrinshoter.ru/sUWzKfusgqB',
					{ responseType: 'blob' }
				)
				formdata.append('image', imageRes.data, 'fixed-image.jpg')

				finalData = formdata
			}

			const res = await apiAxios.post(url, finalData, {
				headers: finalData instanceof FormData
					? { 'Content-Type': 'multipart/form-data' }
					: undefined,
			})
			setData(res.data)

			if (res.data.accessToken) {
				localStorage.setItem('accessToken', JSON.stringify(res.data.accessToken))
			}

			return res.data
		} catch (err) {
			setError(err.response?.data?.message)
		} finally {
			setLoading(false)
		}
	}

	return { postData, data, loading, error, setData  , setError}
}

export default usePostAdd