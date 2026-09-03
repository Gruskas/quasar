import {db} from "@/lib/db"
import {isServerOnline} from "@/lib/ping-server"

export async function getServersWithStatus() {
    const servers = await db.server.findMany({
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