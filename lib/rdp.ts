"use server"

import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/auth";
import {revalidatePath} from "next/cache";

export async function getRDPConnections() {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    return (
        await db.rdp.findMany({
            where: {
                userId: user.id
            },
            select: {
                id: true,
                name: true,
                host: true,
                port: true,
                username: true,
                password: true,
            }
        })
    )
}

export async function addRDP(data: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const name = data.get("name")?.toString();
    const host = data.get("host")?.toString();
    const port = data.get("port")?.toString();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!name || !host || !port || !username || !password) {
        throw new Error("Missing required fields (Name, Host, Username, Password)")
    }


    await db.rdp.create({
        data: {
            userId: user.id,
            name,
            host,
            port: parseInt(port),
            username,
            password
        },
    })

    revalidatePath("/rdp")
}

export async function updateRDP(id: number, data: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const name = data.get("name")?.toString();
    const host = data.get("host")?.toString();
    const port = data.get("port")?.toString();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!name || !host || !port || !username || !password) {
        throw new Error("Missing required fields (Name, Host, Username, Password)")
    }

    await db.rdp.update({
        where: {id, userId: user.id},
        data: {
            userId: user.id,
            name,
            host,
            port: parseInt(port),
            username,
            password
        },
    })

    revalidatePath("/rdp")
}

export async function deleteRDP(id: number) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    await db.rdp.delete({
        where: {id, userId: user.id},
    })

    revalidatePath("/rdp")
}

export async function generateRdpBatchFile(id: number) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const rdp = await db.rdp.findFirst({
        where: {id, userId: user.id},
        select: {
            host: true,
            port: true,
            username: true,
            password: true,
        }
    })

    if (!rdp) {
        throw new Error("RDP not found")
    }

    const host = rdp.host
    const port = rdp.port
    const username = rdp.username
    const password = rdp.password

    return (
        "@echo off\n" +
        "set \"TEMP_RDP=%TEMP%\\temp_%RANDOM%.rdp\"\n" +
        "\n" +
        `echo full address:s:${host}:${port} > "%TEMP_RDP%"\n` +
        "echo prompt for credentials:i:0 >> \"%TEMP_RDP%\"\n" +
        `cmdkey /generic:TERMSRV/${host} /user:${username} /pass:${password}\n` +
        `start "" mstsc "%TEMP_RDP%"\n` +
        `start "" /b cmd /c "timeout /t 1 /nobreak >nul & del /f /q \"%~f0\""\n` +
        "timeout /t 1 /nobreak >nul\n" +
        "if exist \"%TEMP_RDP%\" del /f /q \"%TEMP_RDP%\"\n" +
        `start "" /b cmd /c "timeout /t 5 /nobreak >nul & cmdkey /delete:TERMSRV/${host} >nul 2>&1"\n`
    )
}

export async function getRdpConnectionLink(id: number) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const rdp = await db.rdp.findFirst({
        where: {id, userId: user.id},
        select: {
            host: true,
            port: true,
            username: true,
            password: true,
        }
    })

    if (!rdp) {
        throw new Error("RDP not found")
    }

    return `rdp://${rdp.host}:${rdp.port}/${rdp.username}/${rdp.password}`
}