"use server"

import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {deleteServer} from "@/lib/actions";

export async function getVaults(userId: string) {
    return (await db.vault.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    }))
}

export async function addSSHKey(data: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const name = data.get("name") as string
    const publicKey = data.get("publicKey")?.toString();
    const privateKey = data.get("privateKey") as string;

    await db.vault.create({
        data: {
            userId: user.id,
            name,
            publicKey: publicKey || null,
            privateKey,
        },
    })

    revalidatePath("/vault")
}

export async function updateSSHKey(id: number, data: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const name = data.get("name") as string
    const publicKey = data.get("publicKey")?.toString();
    const privateKey = data.get("privateKey") as string;

    await db.vault.update({
        where: {id, userId: user.id},
        data: {
            name,
            publicKey,
            privateKey,
            updatedAt: new Date(),
        },
    });

    revalidatePath("/vault")
}

export async function deleteSSHKey(id: number) {
    const user = await getCurrentUser()
    if(!user) {
        throw new Error("Unauthorized")
    }

    await db.vault.delete({
        where: {id, userId: user.id},
    })

    revalidatePath("/vault")
}