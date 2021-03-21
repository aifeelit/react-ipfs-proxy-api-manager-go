import dotenv from 'dotenv'
import express, { json } from 'express'
import routes from './routes.js'
import config from './config/index.js'

dotenv.config()

const app = express()

app.use(json())
routes(app)

const port = config.PORT

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})