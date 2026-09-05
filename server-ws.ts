import { WebSocketServer } from "ws"
import { Client } from "ssh2"
import { db } from "./lib/db"

const wss = new WebSocketServer({ port: 3001 })

wss.on("connection", async (ws, req) => {
    const urlParams = new URLSearchParams(req.url?.split("?")[1])
    const serverId = urlParams.get("serverId")

    if (!serverId) {
        ws.close(1008, "Missing serverId")
        return
    }

    const serverData = await db.server.findUnique({
        where: { id: Number(serverId) }, select: {
            host: true,
            port: true,
            username: true,
            password: true,
        }
    })

    if (!serverData) {
        ws.close(1008, "Server not found")
        return
    }

    const ssh = new Client()

    ssh.on("ready", () => {
        ssh.shell({term: "xterm-256color"}, (err, stream) => {
            if (err) {
                ws.send(`\r\nError: ${err.message}\r\n`)
                return ws.close()
            }

            stream.on("data", (data: Buffer) => {
                ws.send(data.toString("utf-8"))
            })

            ws.on("message", (msg) => {
                stream.write(msg.toString())
            })

            stream.on("close", () => {
                ssh.end()
                ws.close()
            })
        })
    })

    ssh.on("error", (err) => {
        ws.send(`\r\nError: ${err.message}\r\n`)
        ws.close()
    })

    ssh.connect({
        host: serverData.host,
        port: Number(serverData.port),
        username: serverData.username,
        password: serverData.password,
    })

    ws.on("close", () => {
        ssh.end()
    })
})