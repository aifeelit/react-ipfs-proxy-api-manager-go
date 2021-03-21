import path from 'path'
import dotenv from 'dotenv'

const __dir = path.resolve()

dotenv.config({
    path: path.resolve(__dir, `.env.${process.env.NODE_ENV}`)
})

export default {
    ENVIRONMENT: process.env.ENVIRONMENT || "development",
    PORT: process.env.API_PORT || 5000,
    IPFS: {
        PROTOCOL: process.env.IPFS_PROTOCOL || "http",
        HOST: process.env.IPFS_HOST || "localhost",
        PORT: process.env.IPFS_PORT || 5001
    }
}