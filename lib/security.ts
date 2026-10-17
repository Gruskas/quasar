import {headers} from "next/headers"

type Counter = {count: number; resetAt: number}

const counters = new Map<string, Counter>()

export async function enforceMutationSecurity(scope: string, limit = 30, windowMs = 60_000) {
    const requestHeaders = await headers()
    const origin = requestHeaders.get("origin")
    const host = requestHeaders.get("host")
    const forwardedHost = requestHeaders.get("x-forwarded-host")
    const expectedHost = forwardedHost || host

    if (origin) {
        let originUrl: URL
        try {
            originUrl = new URL(origin)
        } catch {
            throw new Error("Invalid request origin")
        }
        if (!expectedHost || originUrl.host !== expectedHost) {
            throw new Error("Cross-site mutation rejected")
        }
    }

    const forwardedFor = requestHeaders.get("x-forwarded-for")
    const client = forwardedFor?.split(",")[0]?.trim() || "unknown"
    const key = `${scope}:${client}`
    const now = Date.now()
    const current = counters.get(key)
    if (!current || current.resetAt <= now) {
        counters.set(key, {count: 1, resetAt: now + windowMs})
        return
    }
    if (current.count >= limit) {
        throw new Error("Too many requests")
    }
    current.count += 1
}
