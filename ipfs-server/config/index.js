export default {
    ENVIRONMENT: process.env.ENVIRONMENT || "development",
    PORT: process.env.IPFS_PORT || 3000,
    IPFS: {
        PROTOCOL: process.env.IPFS_PROTOCOL || "http",
        HOST: process.env.IPFS_HOST || "localhost",
        PORT: process.env.IPFS_PORT || 5001
    }
}