"use server"

import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/auth"
import crypto from "crypto"

export async function createTerminalTicket(serverId: number): Promise<string> {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const server = await db.server.findFirst({
        where: {id: serverId, userId: user.id},
        select: {id: true}
    })

    if (!server) {
        throw new Error("Server not found or access denied")
    }

    const ticket = crypto.randomUUID()
    const expiresAt = new Date(Date.now() + 30 * 1000) // 30 seconds

    await db.wsTicket.create({
        data: {
            ticket,
            serverId: server.id,
            userId: user.id,
            expiresAt
        }
    })

    return ticket
}