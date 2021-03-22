import Axios from 'axios'

const url = 'api/v1/apikeys'

export default class ApiKeysService {
    static async create() {
        return Axios.post(url)
    }
    static async get() {
        return Axios.get(url)
    }
    static async disable(apikey) {
        return Axios.put(`${url}/${apikey}`, { disabled: true })
    }
    static async getRequests(apikey) {
        return Axios.get(`${url}/${apikey}/requests`)
    }
}