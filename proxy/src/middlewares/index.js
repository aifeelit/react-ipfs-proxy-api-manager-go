import ApiKeyService from '../services/ApiKeyService.js'

const UNAUTHORIZED = 401

export const requireAuthorization = async (request, response, next) => {

    const key = request.headers.authorization
    const apiKey = await ApiKeyService.get(key)

    if (!apiKey || !ApiKeyService.isValid(apiKey)) {
        response.status(UNAUTHORIZED).send()
    }

    const contentLength = +request.headers['content-length']    //not sure if I should log all requests even if the apikey does not exists
    await ApiKeyService.logRequest(key, contentLength)          //doesn't make a lot of sense since we can't see it in the ui              
                                                                //but it makes sense to log every request also so idk
    next()
}