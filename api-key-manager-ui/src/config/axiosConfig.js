import Axios from 'axios'

Axios.defaults.baseURL = process.env.REACT_APP_API_ENDPOINT

Axios.interceptors.response.use(
    (response) => successHandler(response)
)

const successHandler = response => {
    const data = response.data
    return {
        data: data.data, // -.-
        success: data.success
    }
}