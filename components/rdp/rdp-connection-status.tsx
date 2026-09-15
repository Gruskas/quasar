"use client"

import {useEffect, useState} from "react"
import {getRdpStatus} from "@/lib/rdp-status";

export function RdpConnectionStatus({host, port}: {
    host: string
    port: number
}) {
    const [status, setStatus] = useState<{ isOnline: boolean; latency: number | null } | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        async function fetchStatus() {
            const res = await getRdpStatus(host, port)
            if (isMounted) {
                setStatus(res)
                setLoading(false)
            }
        }

        fetchStatus().catch(console.error)

        return () => {
            isMounted = false
        }
    }, [host, port])

    if (loading) {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground animate-pulse">
                <span className="h-2 w-2 rounded-full bg-zinc-600"/>
                Checking...
            </span>
        )
    }

    if (!status?.isOnline) {
        return (
            <span className="inline-flex items-center gap-1.5 text-xs font-medium text-destructive">
                <span className="h-2 w-2 rounded-full bg-destructive"/>
                Offline
            </span>
        )
    }

    return (
        <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-400">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"/>
            {status.latency} ms
        </span>
    )
}