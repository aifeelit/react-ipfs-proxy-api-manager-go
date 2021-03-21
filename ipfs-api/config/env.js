import path from 'path'
import dotenv from 'dotenv'

const __dir = path.resolve()

dotenv.config({
    path: path.resolve(__dir, `.env.${process.env.NODE_ENV}`)
})

export default {
    ENVIRONMENT: process.env.ENVIRONMENT,
    PORT: process.env.API_PORT,
    ALLOWED_ORIGIN: process.env.ALLOWED_ORIGIN,
    IPFS: {
        PROTOCOL: process.env.IPFS_PROTOCOL,
        HOST: process.env.IPFS_HOST,
        PORT: process.env.IPFS_PORT
    }
}