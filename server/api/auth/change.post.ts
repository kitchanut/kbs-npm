import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
    try {
        // Get request body
        const body = await readBody(event);
        const { username, oldPassword, newPassword } = body;

        // Get authorization header
        const authHeader = getHeader(event, "authorization");
        if (!authHeader?.startsWith("Bearer ")) {
            throw createError({
                statusCode: 401,
                message: "Unauthorized",
            });
        }

        // Find user
        const user = await prisma.users.findUnique({
            where: { username },
        });

        if (!user) {
            throw createError({
                statusCode: 404,
                message: "User not found",
            });
        }

        // Verify old password
        const isValidPassword = await bcrypt.compare(oldPassword, user.password);
        if (!isValidPassword) {
            throw createError({
                statusCode: 400,
                message: "รหัสผ่ายก่าไม่ถูกต้อง",
            });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update user password
        const updatedUser = await prisma.users.update({
            where: { username },
            data: { password: hashedPassword },
        });

        // Remove password from response
        const { password: _, ...userWithoutPassword } = updatedUser;

        return {
            user: userWithoutPassword,
            message: "Password changed successfully",
        };
    } catch (error) {
        const err = error as { statusCode?: number; message?: string };
        throw createError({
            statusCode: err.statusCode || 500,
            message: err.message || "Internal server error",
        });
    }
});
