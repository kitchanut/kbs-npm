import { PrismaClient } from '@prisma/client'
import { getQuery } from 'h3'
const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const method = event.method

    // Handle GET request
    if (method === 'GET') {
        const query = getQuery(event)
        return await prisma.business.findMany({
            where: {
                business_type: query.business_type as string
            },
            orderBy: {
                id: 'asc'
            }
        })
    }

    // For POST requests, we need the body
    if (method === 'POST') {
        const body = await readBody(event)
        return await prisma.business.create({
            data: body
        })
    }

    throw new Error(`Method ${method} not allowed`)
}) 