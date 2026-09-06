import {db} from "@/lib/db"
import {isServerOnline} from "@/lib/ping-server"

export async function getServersWithStatus(userId: string) {
    const servers = await db.server.findMany({
        where : {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    const serversWithStatus = await Promise.all(
        servers.map(async (server) => {
            const isOnline = await isServerOnline(server.host, server.port)
            return {
                ...server,
                isOnline,
            }
        })
    )

    return serversWithStatus
}