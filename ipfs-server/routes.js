import { upload } from './services/ipfsService.js'

const routes = app => {

    app.get('/', (request, response) => {
        return response.send('OK')
    })

    app.post('/upload', async (request, response) => {
        try {
            const data = request.body
            const url = await upload(data)
            return response.json({ data: url });
        }
        catch (ex) {
            return response.status(500).send(ex);
        }
    })
}

export default routes