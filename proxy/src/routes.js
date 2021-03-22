import morgan from 'morgan'
import config from './config/env.js'
import proxyMiddleware from 'http-proxy-middleware'
import _ from 'express-async-errors'
import { requireAuthorization } from './middlewares/index.js'

const { createProxyMiddleware } = proxyMiddleware

const routes = app => {

    app.use(morgan('combined'))

    app.get('/info', (_request, response, _next) => {
        response.send('This is a proxy service which proxies to IPFS API.')
    })

    app.use('/ipfs', requireAuthorization, createProxyMiddleware({
        target: config.IPFS.URL,
        changeOrigin: false,
        pathRewrite: {
            [`^/ipfs`]: '/upload',
        },
    }))

    app.use(function (error, _request, response, _next) {
        console.error(error.stack)
        response.status(500).send('Something broke :(')
    })
}

export default routes