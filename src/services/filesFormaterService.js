//import * as filesFormaterModel from '../services/filesFormaterModel.js'

import axiosConfig from '../config/axios.js'

const getLinesFromContent = (content) => {
    console.log('This is content: ', content)

    let filteredLines = []

    let lines = content.split('\n')

    for (const [index,line] of lines.entries()) {
        if (index == 0) continue

        console.log(index, line)

        //const regex = /[a-zA-Z0-9]+,[a-zA-Z]+,\d+,[a-zA-Z0-9]+$/
        const regex = /([a-zA-Z0-9]+\.[a-zA-Z0-9]+),([a-zA-Z]+),(\d+),([a-zA-Z0-9]+)+$/

        if (regex.test(line)) {
            const match = line.match(regex)

            console.log(match)
        }
    }
}

export const getFormats = async() => {
	try {
		// const currency = req?.query?.currency || DEFAULT_CURRENCY
		//const files = req?.query?.product || null

		//console.log(req)

        let response = {}

        let files;

        await axiosConfig.get('/secret/files', {
            headers: {
              'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}`
            }
        }).then(response => {
            //console.log(response.status)
            console.log(response.data)
            files = response.data.files
        })
        
        for (const file of files) {
            console.log(file)
            await axiosConfig.get(`/secret/file/${file}`, {
                headers: {
                  'Authorization': `Bearer ${process.env.EXTERNAL_API_TOKEN}`
                }
            }).then(response => {
                console.log(response.data)
                getLinesFromContent(response.data)
            }).catch(error => {
                console.log(`Error fetching file ${file}`)
                console.log(error)
            })
        }
            

		// const result = await filesFormaterService.getFormats(currency, product)
		//res.json({})
	} catch (error) {
		console.error('Error fetching sales data:', error)
    	res.status(500).json({ error: 'Internal Server Error' })
	}
}