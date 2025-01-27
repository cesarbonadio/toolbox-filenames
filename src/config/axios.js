import axios from 'axios'

const apiPath = process.env.EXTERNAL_API_URL || 'https://echo-serv.tbxnet.com/v1'
// const config = {
//     httpsAgent: new https.Agent({
//         rejectUnauthorized: false
//     })
// }

const axiosInstance = axios.create({
    baseURL: apiPath,
    //config: config
})

axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${process.env.EXTERNAL_API_TOKEN}`

export default axiosInstance