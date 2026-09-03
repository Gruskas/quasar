import net from "net"

export async function isServerOnline(host: string, port: number, timeoutMs: number = 1500): Promise<boolean> {
    return new Promise((resolve) => {
        const socket = new net.Socket()

        socket.setTimeout(timeoutMs)

        socket.on("connect", () => {
            socket.destroy()
            resolve(true)
        })

        socket.on("timeout", () => {
            socket.destroy()
            resolve(false)
        })

        socket.on("error", () => {
            socket.destroy()
            resolve(false)
        })

        socket.connect(port, host)
    })
}