"use server"

import net from "node:net"
import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/auth"

export async function getRdpStatus(id: number, timeout = 2500): Promise<{
    isOnline: boolean
    latency: number | null
}> {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    if (!Number.isInteger(id) || id <= 0) {
        throw new Error("Invalid RDP id")
    }

    const rdp = await db.rdp.findFirst({
        where: {
            id,
            userId: user.id,
        },
        select: {
            host: true,
            port: true,
        },
    })

    if (!rdp) {
        throw new Error("RDP connection not found")
    }

    if (!Number.isInteger(rdp.port) || rdp.port < 1 || rdp.port > 65535) {
        throw new Error("Invalid RDP port")
    }

    return new Promise((resolve) => {
        const start = Date.now()
        const socket = new net.Socket()

        socket.setTimeout(timeout)

        socket.on("connect", () => {
            const latency = Date.now() - start
            socket.destroy()
            resolve({isOnline: true, latency})
        })

        const handleFailure = () => {
            socket.destroy()
            resolve({isOnline: false, latency: null})
        }

        socket.on("error", handleFailure)
        socket.on("timeout", handleFailure)

        socket.connect(rdp.port, rdp.host)
    })
}