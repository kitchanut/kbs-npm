import { defineEventHandler, createError, getHeaders } from 'h3'
import { createClient } from '@supabase/supabase-js'

export default defineEventHandler(async (event) => {
    // Skip middleware if path doesn't need authentication
    if (!event.path.startsWith('/api/')) return

    // Skip middleware for public routes
    const publicRoutes = ['/api/auth/login', '/api/auth/register', '/api/auth/change', '/api/auth/check', '/api/form', '/api/form?type=pharmacy', '/api/form?type=food', '/api/business?business_type=pharmacy']
    if (publicRoutes.includes(event.path)) return

    const headers = getHeaders(event)
    const authHeader = headers.authorization

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw createError({
            statusCode: 401,
            message: 'No token provided'
        })
    }

    try {
        const token = authHeader.split(' ')[1]
        
        const {
            supabaseServiceRoleKey,
            public: { supabaseUrl },
        } = useRuntimeConfig()
        
        const supabase = createClient(supabaseUrl, supabaseServiceRoleKey)
        
        // Verify the token with Supabase
        const { data: { user }, error } = await supabase.auth.getUser(token)
        
        if (error || !user) {
            throw createError({
                statusCode: 401,
                message: 'Invalid or expired token'
            })
        }

        // Add user to event context for use in route handlers
        event.context.auth = {
            user,
            token
        }

    } catch (error) {
        throw createError({
            statusCode: 401,
            message: 'Invalid or expired token'
        })
    }
})