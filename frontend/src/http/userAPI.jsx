import { $authHost, $host } from "./index";


import Cookies from "universal-cookie"
const cookies = new Cookies();

export const login = async (username, password) => {
    const data = await $host.post('/api/auth', { username, password }, {
        withCredentials: true
    })
    console.log(data)
    const access_token = await data["data"]["token"]
    const id = await data["data"]["id"]
    cookies.set('data', access_token)
    cookies.set('id', id)


    return access_token
}

export const check = async () => {
    const data  = await $authHost.get('/api/token')
    console.log(data)
    const access_token = await data["data"]["token"]
    const id = await data["data"]["id"]
    cookies.set('data', access_token)
    cookies.set('id', id)
    return access_token
}