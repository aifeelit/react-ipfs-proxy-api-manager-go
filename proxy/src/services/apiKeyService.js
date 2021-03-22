import Axios from 'axios'

const url = 'api/v1/apikeys'

export default class ApiKeysService {

    static async logRequest(apiKey, contentLength) {
        await Axios.post(`${url}/${apiKey}/requests`, { apikey: apiKey, size: contentLength })
    }

    static isValid(key) {
        return !key.disabled
    }

    static async get(key) {
        try {
            let response = await Axios.get(`${url}/${key}`)

            if (response.success) {
                return response.data.apiKey
            }

            return null
        }
        catch (ex) {
            return null
        }
    }
}