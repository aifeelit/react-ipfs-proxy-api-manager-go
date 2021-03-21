import ipfs from '../ipfs.js'

const addFile = async ({ path, content }) => {
    const file = { path: path, content: Buffer.from(content) }
    const addedFile = await ipfs.add(file)
    return addedFile
}

const getHash = file => {
    const { cid } = file
    const hash = cid.toString()
    return hash
}

const getGatewayUrl = hash => `https://gateway.ipfs.io/ipfs/${hash}`

export const upload = async (data) => {
    const addedFile = await addFile(data)
    const hash = getHash(addedFile)
    return getGatewayUrl(hash)
}