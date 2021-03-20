import React, { useState, useEffect } from 'react'

const API_KEYS = [
    {
        key: "123456789",
        disabled: false
    },
    {
        key: "456456456",
        disabled: true
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
        setApiKeys([...apiKeys, { key: Math.floor(Math.random() * 1000000000).toString(), disabled: false }])
    }

    const disableApiKey = async (key) => {
        //TODO disable api key
        setApiKeys(apiKeys.map(k => k.key == key ? {...k, disabled : true} : k))
    }

    return { apiKeys, createApiKey, disableApiKey }
}

export default useApiKeys