"use server"

import {db} from "@/lib/db";
import {getCurrentUser} from "@/lib/auth"
import {revalidatePath} from "next/cache"

export interface ConnectionSettingsData {
    defaultSshPort: number
    defaultRdpPort: number
    connectionTimeout: number
    defaultRdpClient: "bat" | "uri"
}

const DEFAULT_SETTINGS: ConnectionSettingsData = {
    defaultSshPort: 22,
    defaultRdpPort: 3389,
    connectionTimeout: 10,
    defaultRdpClient: "bat"
};

export async function getConnectionSettings() {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const settings = await db.userSettings.findUnique({
        where: {userId: user.id}
    });

    if (!settings) {
        const created = await db.userSettings.create({
            data: {
                userId: user.id,
                ...DEFAULT_SETTINGS
            }
        })
        return {
            defaultSshPort: created.defaultSshPort,
            defaultRdpPort: created.defaultRdpPort,
            connectionTimeout: created.connectionTimeout,
            defaultRdpClient: created.defaultRdpClient as "bat" | "uri"
        };
    }

    return {
        defaultSshPort: settings.defaultSshPort,
        defaultRdpPort: settings.defaultRdpPort,
        connectionTimeout: settings.connectionTimeout,
        defaultRdpClient: settings.defaultRdpClient as "bat" | "uri"
    }
}

export async function updateConnectionSettings(data: FormData) {
    const user = await getCurrentUser()
    if (!user) {
        throw new Error("Unauthorized")
    }

    const ssh = Number(data.get("defaultSshPort"))
    const rdp = Number(data.get("defaultRdpPort"))
    const timeout = Number(data.get("connectionTimeout"))
    const rdpClient = data.get("defaultRdpClient")

    await db.userSettings.update({
        where: {
            userId: user.id
        },
        data: {
            ...(ssh && {defaultSshPort: ssh}),
            ...(rdp && {defaultRdpPort: rdp}),
            ...(timeout && {connectionTimeout: timeout}),
            ...(rdpClient && {defaultRdpClient: rdpClient as "bat" | "uri"})
        }
    })

    revalidatePath("/")
}