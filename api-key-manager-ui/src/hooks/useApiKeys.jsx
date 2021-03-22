import { useState, useEffect } from 'react'
import ApiKeyService from '../services/ApiKeysService.js'

const useApiKeys = () => {
    const [apiKeys, setApiKeys] = useState([])

    useEffect(() => {
        const get = async () => {
            let response = await ApiKeyService.get()

            if (response.success) {
                setApiKeys(response.data.apiKeys)
            }
            else {
                console.log("error getting apikeys")
            }
        }
        get()
    }, [])

    const createApiKey = async () => {
        let response = await ApiKeyService.create()

        if (response.success) {
            setApiKeys([response.data.apiKey, ...apiKeys])
        }
        else {
            console.log("error creating apikey")
        }
    }

    const disableApiKey = async (key) => {
        let response = await ApiKeyService.disable(key)

        if (response.success) {
            setApiKeys(apiKeys.map(k => k.apikey === key ? { ...k, disabled: true } : k))
        }
        else {
            console.log("error disabling apikey")
        }
    }

    const getRequests = async (key) => {
        let response = await ApiKeyService.getRequests(key)
        
        if (response.success) {
            setApiKeys(apiKeys.map(k => k.apikey === key ? { ...k, requests: response.data.request } : k))
        }
        else {
            console.log("error getting apikey requests")
        }
    }

    return { apiKeys, createApiKey, disableApiKey, getRequests }
}

export default useApiKeys