import { PrismaClient } from '@prisma/client'
import { getRouterParam } from 'h3'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const method = event.method
    const id = parseInt(getRouterParam(event, 'id') || '')

    // Handle GET request
    if (method === 'GET') {
        return await prisma.business.findUnique({
            where: { id }
        })
    }

    // For other methods, we need the body
    const body = await readBody(event)

    switch (method) {
        case 'PUT':
            return await prisma.business.update({
                where: { id },
                data: body
            })

        case 'DELETE':
            return await prisma.business.delete({
                where: { id }
            })

        default:
            throw new Error(`Method ${method} not allowed`)
    }
})