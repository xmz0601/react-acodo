import axios from 'axios'
import { message } from 'antd'

export default async function sendAjaxReq(url, data = {}, method) {
    try {
        let response
        if (method === 'get') {
            response = await axios.get(url, { params: data })
        } else if (method === 'post') {
            response = await axios.post(url, data)
        } else if (method === 'put') {
            response = await axios.put(url, data)
        } else {
            response = await axios.delete(url)
        }
        return response.data
    } catch (error) {
        message.error('something wrong happened: ' + error.message)
    }
}
