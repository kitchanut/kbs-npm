import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    // Get the query parameter for type
    const { type } = getQuery(event)


    // Query the database for forms matching the type
    const forms = await prisma.form.findMany({
        where: {
            type: type as string
        }
    })

    return forms
})
