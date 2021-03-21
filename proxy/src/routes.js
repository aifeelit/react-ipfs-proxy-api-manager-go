import morgan from 'morgan'
import config from './config/env.js'
import proxyMiddleware from 'http-proxy-middleware'
import _ from 'express-async-errors'
import { logRequest, requireAuthorization } from './middlewares/index.js'

const { createProxyMiddleware } = proxyMiddleware

const routes = app => {

    app.use(morgan('combined'))

    app.get('/info', (_request, response, _next) => {
        console.log(_request)
        response.send('This is a proxy service which proxies to IPFS API.')
    })

    app.use('/IPFS', [logRequest, requireAuthorization], createProxyMiddleware({
        target: config.IPFS.URL,
        changeOrigin: true,
        pathRewrite: {
            [`^/IPFS`]: '/upload',
        },
    }))

    app.use(function (error, _request, response, _next) {
        console.error(error.stack)
        response.status(500).send('Something broke :(')
    })
}

export default routes