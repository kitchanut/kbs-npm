import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    try {
        const form = await prisma.form.upsert({
            where: {
                id: Number(body.id || 0)
            },
            update: {
                type: body.type,
                content: body.content,
                userId: body.userId
            },
            create: {
                type: body.type,
                content: body.content,
                userId: body.userId
            }
        })
        return form
    } catch (error) {
        console.error('Error creating form:', error)
        throw createError({
            statusCode: 500,
            statusMessage: 'Error saving form data'
        })
    }
}) 