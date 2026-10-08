"use client"

import {useEffect, useRef} from "react"
import {Terminal} from "@xterm/xterm"
import {FitAddon} from "@xterm/addon-fit"
import {createTerminalTicket} from "@/lib/terminal-auth"
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

        let ws: WebSocket | null = null
        let cancelled = false

        void createTerminalTicket(Number(serverId)).then((ticket) => {
            if (cancelled) {
                return
            }

            ws = new WebSocket(
                `ws://127.0.0.1:3001?ticket=${encodeURIComponent(ticket)}&cols=${term.cols}&rows=${term.rows}`
            )

            ws.onmessage = (event) => {
                term.write(event.data)
            }

            ws.onerror = () => {
                term.write("\r\n*** WebSocket connection error. Check the WS server console. ***\r\n")
            }

            ws.onclose = (event) => {
                term.write(`\r\n*** Connection closed (${event.code}: ${event.reason || "no reason"}) ***\r\n`)
            }
        }).catch((error: Error) => {
            if (!cancelled) {
                console.error(error)
                term.write(`\r\n*** Failed to create terminal ticket: ${error.message} ***\r\n`)
            }
        })

        const sendResize = () => {
            fitAddon.fit()
            if (ws?.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({
                    type: "resize",
                    cols: term.cols,
                    rows: term.rows,
                }))
            }
        }

        term.onData((data) => {
            if (ws?.readyState === WebSocket.OPEN) {
                ws.send(data)
            }
        })

        const handleResize = () => sendResize()
        window.addEventListener("resize", handleResize)

        return () => {
            cancelled = true
            window.removeEventListener("resize", handleResize)
            ws?.close()
            term.dispose()
        }
    }, [serverId])

    return (
        <div className="h-screen w-screen bg-black p-2 overflow-hidden">
            <div ref={terminalRef} className="h-full w-full"/>
        </div>
    )
}