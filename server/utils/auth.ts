import jwt from 'jsonwebtoken'
import { H3Event } from 'h3'

export function getJwtToken(event: H3Event): string | null {
    const authHeader = getHeader(event, 'Authorization')
    if (!authHeader) return null

    const token = authHeader.replace('Bearer ', '')
    return token
}

export function verifyToken(token: string) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || '0AQ2m+pdCiVJRHme5YSVDjyg8VZpcqq7a1ifd4zbFNC96tvuvhisZ7DPaxTuA0OtZ8Pk7aF+iomfyiSL1IC0vw==')
        return decoded
    } catch (error) {
        return null
    }
} 