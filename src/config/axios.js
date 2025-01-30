import axios from 'axios'
import dotenv from 'dotenv'
dotenv.config()

// the base url of the external API - must configure at .env level!
const apiPath = process.env.EXTERNAL_API_URL || 'https://echo-serv.tbxnet.com/v1'

// the axios instance with the auth settetd - must configure variables at .env level!
const axiosInstance = axios.create({
  baseURL: apiPath,
  headers: {
    Authorization: `Bearer ${process.env.EXTERNAL_API_TOKEN}`
  }
})

export default axiosInstance
