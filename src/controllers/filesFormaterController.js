import * as filesFormaterService from '../services/filesFormaterService.js'

/**
 * Controller to handle sales per month request.
 */
export const getFormats = async(req, res) => {
	try {
		// const currency = req?.query?.currency || DEFAULT_CURRENCY
		const files = req?.query?.product || null

		//console.log(req)

		const result = await filesFormaterService.getFormats()
		res.json({})
	} catch (error) {
		console.error('Error fetching sales data:', error)
    	res.status(500).json({ error: 'Internal Server Error' })
	}
}