"use server"

import net from "net"

export async function getRdpStatus(host: string, port: number, timeout = 2500): Promise<{
    isOnline: boolean;
    latency: number | null
}> {
    return new Promise((resolve) => {
            const start = Date.now()
            const socket = new net.Socket()

            socket.setTimeout(timeout)

            socket.on("connect", () => {
                const latency = Date.now() - start
                socket.destroy()
                resolve({isOnline: true, latency})
            })

            socket.on("error", () => {
                socket.destroy()
                resolve({isOnline: false, latency: null})
            })

            socket.on("timeout", () => {
                socket.destroy()
                resolve({isOnline: false, latency: null})
            })

            socket.connect(port, host)
        }
    )
}