import ipfsClient from 'ipfs-http-client'
import config from './config/env.js'

const ipfsConfig = config.IPFS
const protocol = ipfsConfig.PROTOCOL
const host = ipfsConfig.HOST
const port = ipfsConfig.PORT

const ipfs = ipfsClient({
    host: host,
    port: port,
    protocol: protocol,
})

console.log(`IPFS running on ${protocol}://${host}:${port}`)

export default ipfs