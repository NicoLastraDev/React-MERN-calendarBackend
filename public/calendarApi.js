import axios from "axios";
import { getEnvVariables } from "../helpers/getEnvVariables";

const {VITE_API_URL} = getEnvVariables()

const calendarApi = axios.create({
  baseURL: '/api' //VITE_API_URL es solo para desarrollo,
})

//todo: configurar interceptores
calendarApi.interceptors.request.use(config => {
  config.headers= {
    ...config.headers,
    'x-token': localStorage.getItem('token') 
  }
  return config
})
export default calendarApi
