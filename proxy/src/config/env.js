import path from 'path'
import dotenv from 'dotenv'

const __dir = path.resolve()

dotenv.config({
    path: path.resolve(__dir, `.env.${process.env.NODE_ENV}`)
})

export default {
    HOST: process.env.PROXY_HOST || 'localhost',
    PORT: process.env.PROXY_PORT || 4000,
    IPFS: {
        URL: process.env.IPFS_API_URL || "https://jsonplaceholder.typicode.com"
    }
}