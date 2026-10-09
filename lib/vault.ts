"use server"

import {db} from "@/lib/db"
import {getCurrentUser} from "@/lib/auth";
import {revalidatePath} from "next/cache";
import {getSSHKeyType} from "@/lib/sshKey";
import {decryptSecret, encryptSecret} from "@/lib/secrets";

export async function getVaults(userId: string) {
    const vaults = await db.vault.findMany({
        where: {
            userId: userId,
        },
        orderBy: {
            createdAt: "desc",
        }
    })

    return vaults.map((vault) => ({
        ...vault,
        privateKey: decryptSecret(vault.privateKey),
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
    const keyInfo = getSSHKeyType(privateKey)

    await db.vault.create({
        data: {
            userId: user.id,
            name,
            publicKey: publicKey || null,
            privateKey: encryptSecret(privateKey),
            keyType: keyInfo.keyType,
            keyBits: keyInfo.bits || null,
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
            privateKey: encryptSecret(privateKey),
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