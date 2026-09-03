"use server"

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function addServer(data: FormData) {
    const name = data.get("name")?.toString();
    const host = data.get("host")?.toString();
    const port = data.get("port")?.toString();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!name || !host || !port || !username || !password) {
        throw new Error("Missing required fields");
    }

    await db.server.create({
        data: {
            name,
            host,
            port: parseInt(port),
            username,
            password,
            userId: 1,
        },
    });

    revalidatePath("/servers");
}