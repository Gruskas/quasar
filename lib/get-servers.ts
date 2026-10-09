import {db} from "@/lib/db"
import {isServerOnline} from "@/lib/ping-server"
import {decryptSecret} from "@/lib/secrets"

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
            const authMethod = server.sshKeyId ? "SSH Key" : "Password"
            return {
                ...server,
                password: server.password ? decryptSecret(server.password) : server.password,
                authMethod,
                isOnline,
            }
        })
    )

    return serversWithStatus
}