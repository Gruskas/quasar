import { cookies } from "next/headers"
import { db } from "@/lib/db"
import {Session} from "node:inspector";

export const SESSION_COOKIE = "quasar_session"

export async function getCurrentUser() {
    const cookieStore = await cookies()
    const session = cookieStore.get(SESSION_COOKIE)?.value

    if (!session) {
        return null
    }

    const userId = Number(session)

    if (!Number.isInteger(userId)) {
        return null
    }

    return db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            username: true,
        },
    })
}

export async function setSessionCookie(userId: number) {
    const cookieStore = await cookies()
    cookieStore.set(SESSION_COOKIE, String(userId), {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 30, // 30 days
    })
}

export async function deleteSessionCookie() {
    const cookieStore = await cookies()
    cookieStore.delete(SESSION_COOKIE)
}