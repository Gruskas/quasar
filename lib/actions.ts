"use server"

import {revalidatePath} from "next/cache";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import { setSessionCookie, deleteSessionCookie } from "@/lib/auth"
import { getCurrentUser } from "@/lib/auth";

export async function addServer(data: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

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
            userId: user.id,
        },
    });

    revalidatePath("/servers");
}

export async function deleteServer(id: number) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    await db.server.delete({
        where: {id, userId: user.id},
    });

    revalidatePath("/servers");
}

export async function updateServer(id: number, data: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const name = data.get("name")?.toString();
    const host = data.get("host")?.toString();
    const port = data.get("port")?.toString();
    const username = data.get("username")?.toString();
    const password = data.get("password")?.toString();

    if (!id || !name || !host || !port || !username || !password) {
        throw new Error("Missing required fields");
    }

    await db.server.update({
        where: {id, userId: user.id},
        data: {
            name,
            host,
            port: parseInt(port),
            username,
            password,
        },
    });

    revalidatePath("/servers");
}

export async function signup(formData: FormData) {
    const username = formData.get("username")?.toString().trim();
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();
    const confirmPassword = formData.get("confirm-password")?.toString();

    if (!username || !email || !password || !confirmPassword) {
        throw new Error("all fields are required");
    }

    if (password !== confirmPassword) {
        throw new Error("Passwords do not match");
    }

    const existingUser = await db.user.findFirst({
        where: { OR: [{ email }, { username }] },
    });

    if (existingUser) {
        throw new Error("User with the same email or username already exists");
    }

    const user = await db.user.create({
        data: {
            username,
            email,
            password,
        },
    });

    await setSessionCookie(user.id);

    revalidatePath("/");
    redirect("/");
}

export async function login(formData: FormData) {
    const email = formData.get("email")?.toString().trim().toLowerCase();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        throw new Error("Email and password are required");
    }

    const user = await db.user.findUnique({ where: { email } });

    if (!user || user.password !== password) {
        throw new Error("Invalid email or password");
    }

    await setSessionCookie(user.id);

    revalidatePath("/");
    redirect("/");
}

export async function logout() {
    await deleteSessionCookie();
    revalidatePath("/");
    redirect("/login");
}