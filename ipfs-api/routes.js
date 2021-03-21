import { upload } from './services/ipfsService.js'
import _ from 'express-async-errors'

const INTERNAL_ERROR = 500

const routes = app => {

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
}

export default routes