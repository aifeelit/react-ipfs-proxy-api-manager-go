import ipfsClient from 'ipfs-http-client'
import config from './config/env.js'

const ipfsConfig = config.IPFS

const ipfs = ipfsClient({
    host: ipfsConfig.HOST,
    port: ipfsConfig.PORT,
    protocol: ipfsConfig.PROTOCOL,
})

export default ipfs