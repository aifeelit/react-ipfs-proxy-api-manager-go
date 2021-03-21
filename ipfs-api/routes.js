import { upload } from './services/ipfsService.js'
import _ from 'express-async-errors'
import morgan from 'morgan'
import hostValidation from 'host-validation'
import config from './config/env.js'

const INTERNAL_ERROR = 500

const routes = app => {

    app.use(morgan('combined'))

    app.use(hostValidation({ hosts: [config.ALLOWED_ORIGIN] }))

    app.get('/', (_request, response) => {
        return response.send('OK')
    })

    app.post('/upload', async (request, response) => {
        try {
            const data = request.body
            const url = await upload(data)
            return response.json({ data: url });
        }
        catch (ex) {
            return response.status(INTERNAL_ERROR).send(ex);
        }
    })

    app.use(function (error, _request, response, _next) {
        console.error(error.stack)
        response.status(500).send('Something broke :(')
    })
}

export default routes