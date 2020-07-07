import axios from 'axios'
import {AxiosConfig} from "../@types"
import {config} from "../config"
import StorageService from "./Storage"

const getHeaders = () => {
    const auth = StorageService.get(config.AUTH)
    let token
    if (auth) {
        token = JSON.parse(auth).accessToken
        return {
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        }
    } else {
        return {
            'Content-type': 'application/json',
        }
    }
}
export const fetchService = async (axiosConfig:AxiosConfig)=>{
    try {
        const requestParams = {
            baseURL:config.BASE_URL,
            headers:{
                ...axiosConfig.headers,...getHeaders()
            },...axiosConfig
        }
        const response = await axios(requestParams)
        const {data, status} = response
        if(data){
            return {data, status}
        }else {
            throw new Error("Error on FetchService")
        }
    }catch (e){
        return {
            data:e.data, status:e.status
        }
    }
}