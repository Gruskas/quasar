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