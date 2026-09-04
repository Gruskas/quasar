import {cookies} from "next/headers"
import {db} from "@/lib/db"
import crypto from "crypto"

export const SESSION_COOKIE = "quasar_session"

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (!token) {
        return null
    }

    const session = await db.session.findUnique({
        where: {token},
        include: {user: {select: {id: true, username: true}}},
    })

    if (!session || session.expiresAt < new Date()) {
        return null
    }

    return session.user
}

export async function setSessionCookie(userId: number) {
    const cookieStore = await cookies()
    const token = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30) // 30 days

    await db.session.create({
        data: {
            userId,
            token,
            expiresAt,
        },
    })

    cookieStore.set(SESSION_COOKIE, token, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        expires: expiresAt,
    })
}

export async function deleteSessionCookie() {
    const cookieStore = await cookies()
    const token = cookieStore.get(SESSION_COOKIE)?.value

    if (token) {
        await db.session.deleteMany({
            where: {token},
        })
    }
    cookieStore.delete(SESSION_COOKIE)
}