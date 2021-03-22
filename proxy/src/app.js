import express from 'express/index.js'
import routes from './routes.js'
import config from './config/env.js'
import './config/axiosConfig.js'

const app = express()
routes(app)

const host = config.HOST
const port = config.PORT

app.listen(port, host, () => {
    console.log(`Starting Proxy at ${host}:${port}`)
})