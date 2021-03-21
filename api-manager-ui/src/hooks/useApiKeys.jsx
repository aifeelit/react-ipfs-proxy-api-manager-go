import { useState, useEffect } from 'react'

const API_KEYS = [
    {
        key: "123456789",
        disabled: false,
        requests: [
            {
                datetime: '20/03/2020',
                size: 150
            },
            {
                datetime: '21/03/2020',
                size: 200
            }
        ]
    },
    {
        key: "456456456",
        disabled: true,
        requests: []
    },
]

const useApiKeys = () => {
    const [apiKeys, setApiKeys] = useState([])

    useEffect(() => {
        //TODO get api keys
        setApiKeys(API_KEYS)
    }, [])

    const createApiKey = async () => {
        //TODO create api key
        setApiKeys([{ key: Math.floor(Math.random() * 1000000000).toString(), disabled: false, requests: [] }, ...apiKeys])
    }

    const disableApiKey = async (key) => {
        //TODO disable api key
        setApiKeys(apiKeys.map(k => k.key === key ? { ...k, disabled: true } : k))
    }

    return { apiKeys, createApiKey, disableApiKey }
}

export default useApiKeys