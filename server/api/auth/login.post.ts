import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    try {
        const body = await readBody(event)
        const { username, password } = body

        // Validate input
        if (!username || !password) {
            return createError({
                statusCode: 400,
                message: 'Username and password are required'
            })
        }

        // Find user
        const user = await prisma.users.findUnique({
            where: { username }
        })

        if (!user) {
            return createError({
                statusCode: 401,
                message: 'Invalid username or password'
            })
        }

        // Verify password
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (!isValidPassword) {
            return createError({
                statusCode: 401,
                message: 'Invalid username or password'
            })
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                userId: user.id,
                username: user.username,
                role: user.role
            },
            process.env.JWT_SECRET || '0AQ2m+pdCiVJRHme5YSVDjyg8VZpcqq7a1ifd4zbFNC96tvuvhisZ7DPaxTuA0OtZ8Pk7aF+iomfyiSL1IC0vw==',
            { expiresIn: '24h' }
        )

        return {
            token,
            user: {
                id: user.id,
                username: user.username,
                name: user.name,
                role: user.role
            }
        }
    } catch (error) {
        return createError({
            statusCode: 500,
            message: 'Internal server error'
        })
    }
})
