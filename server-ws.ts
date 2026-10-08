import {WebSocketServer} from "ws"
import {Client, ConnectConfig} from "ssh2"
import {db} from "./lib/db"

const allowedOrigins = new Set(
    (process.env.WS_ALLOWED_ORIGINS ?? "http://localhost:4351,http://127.0.0.1:4351")
        .split(",")
        .map((origin) => origin.trim())
)

const wss = new WebSocketServer({
    host: "127.0.0.1",
    port: 3001,
    verifyClient: ({origin}: {origin: string}) => {
        const accepted = allowedOrigins.has(origin)
        if (!accepted) {
            console.warn(`[ws] rejected origin: ${origin || "<empty>"}`)
        }
        return accepted
    },
})

wss.on("connection", async (ws, req) => {
    console.info(`[ws] client connected`)
    const urlParams = new URLSearchParams(req.url?.split("?")[1])
    const ticket = urlParams.get("ticket")
    const cols = Number(urlParams.get("cols")) || 80
    const rows = Number(urlParams.get("rows")) || 24

    if (!ticket) {
        ws.close(1008, "Missing ticket")
        return
    }

    const ticketData = await db.wsTicket.findUnique({
        where: {ticket},
        select: {
            serverId: true,
            expiresAt: true
        }
    })

    if (!ticketData) {
        ws.close(1008, "Invalid ticket")
        return
    }

    if (ticketData.expiresAt < new Date()) {
        ws.close(1008, "Ticket expired")
        return
    }

    await db.wsTicket.delete({where: {ticket}})

    const serverData = await db.server.findUnique({
        where: {id: Number(ticketData.serverId)}, select: {
            host: true,
            port: true,
            username: true,
            password: true,
            sshKeyId: true,
            sshKey: {
                select: {
                    privateKey: true,
                }
            }
        }
    })

    if (!serverData) {
        ws.close(1008, "Server not found")
        return
    }

    const sshConfig: ConnectConfig = {
        host: serverData.host,
        port: serverData.port,
        username: serverData.username
    }

    if (serverData.password) {
        sshConfig.password = serverData.password
    } else if (serverData.sshKey?.privateKey) {
        sshConfig.privateKey = serverData.sshKey?.privateKey
    } else {
        ws.close(1008, "No password or SSH key provided")
        return
    }

    const ssh = new Client()

    ssh.on("ready", () => {
        ssh.shell({term: "xterm-256color", cols: cols, rows: rows}, (err, stream) => {
            if (err) {
                ws.send(`\r\nError: ${err.message}\r\n`)
                return ws.close()
            }

            stream.on("data", (data: Buffer) => {
                ws.send(data.toString("utf-8"))
            })

            ws.on("message", (msg) => {
                const raw = msg.toString()

                if (raw.startsWith('{"type":"resize"')) {
                    const {rows, cols} = JSON.parse(raw)
                    return stream.setWindow(rows, cols, 0, 0)
                }

                stream.write(raw)
            })

            stream.on("close", () => {
                ssh.end()
                ws.close()
            })
        })
    })

    ssh.on("error", (err) => {
        console.error(`[ssh] connection failed: ${err.message}`)
        ws.send(`\r\nError: ${err.message}\r\n`)
        ws.close()
    })

    ssh.connect(sshConfig)

    ws.on("close", () => {
        console.info("[ws] client disconnected")
        ssh.end()
    })
})