import { getJwtToken, verifyToken } from '~/server/utils/auth'

export default defineEventHandler(async (event) => {
    const token = getJwtToken(event)


    if (!token) {
        return createError({
            statusCode: 401,
            message: 'Not authenticated'
        })
    }

    const decoded = await verifyToken(token)
    if (!decoded) {
        return createError({
            statusCode: 401,
            message: 'Invalid token'
        })
    }

    return {
        authenticated: true,
        user: decoded
    }
}) 