import path from 'path'
import dotenv from 'dotenv'

const __dir = path.resolve()

dotenv.config({
    path: path.resolve(__dir, `.env.${process.env.NODE_ENV}`)
})

export default {
    ENVIRONMENT: process.env.ENVIRONMENT,
    HOST: process.env.PROXY_HOST,
    PORT: process.env.PROXY_PORT,
    IPFS: {
        URL: process.env.IPFS_API_URL
    }
}