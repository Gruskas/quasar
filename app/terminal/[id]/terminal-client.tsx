"use client"

import {useEffect, useRef} from "react"
import {Terminal} from "@xterm/xterm"
import {FitAddon} from "@xterm/addon-fit"
import "@xterm/xterm/css/xterm.css"

export function TerminalClient({serverId}: { serverId: string }) {
    const terminalRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!terminalRef.current || !serverId) return

        const term = new Terminal({
            cursorBlink: true,
            fontSize: 14,
            theme: {
                background: "#09090b",
                foreground: "#f4f4f5",
            },
        })

        const fitAddon = new FitAddon()
        term.loadAddon(fitAddon)
        term.open(terminalRef.current)
        fitAddon.fit()

        const ws = new WebSocket(
            `ws://localhost:3001?serverId=${serverId}&cols=${term.cols}&rows=${term.rows}`
        )

        const sendResize = () => {
            fitAddon.fit()
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: "resize",
                    cols: term.cols,
                    rows: term.rows,
                }))
            }
        }

        ws.onmessage = (event) => {
            term.write(event.data)
        }

        term.onData((data) => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(data)
            }
        })

        ws.onclose = () => {
            term.write("\r\n*** Connection closed ***\r\n")
        }

        const handleResize = () => sendResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            ws.close()
            term.dispose()
        }
    }, [serverId])

    return (
        <div className="h-screen w-screen bg-black p-2 overflow-hidden">
            <div ref={terminalRef} className="h-full w-full"/>
        </div>
    )
}