import { log, checkIsValid } from '../services/apiKeyService.js'

const UNAUTHORIZED = 401

export const requireAuthorization = async (request, response, next) => {
    if (request.headers.authorization && (await checkIsValid(request))) {
        next()
    } else {
        response.sendStatus(UNAUTHORIZED)
    }
}

export const logRequest = async (request, _response, next) => {
    await log(request)
    next()
}