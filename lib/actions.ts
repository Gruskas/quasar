"use server"

import bcrypt from "bcryptjs";
import {revalidatePath} from "next/cache";
import {db} from "@/lib/db";
import {redirect} from "next/navigation";
import {setSessionCookie, deleteSessionCookie} from "@/lib/auth"
import {getCurrentUser} from "@/lib/auth";
import path from "path";
import {mkdir, writeFile} from "node:fs/promises";
import {encryptSecret} from "@/lib/secrets";

async function hashPassword(password: string) {
    return bcrypt.hash(password, 12);
}

async function verifyPassword(password: string, storedPassword: string) {
    if (!storedPassword) {
        return false;
    }
    return bcrypt.compare(password, storedPassword);
}

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
    const rawSSHKeyId = data.get("sshKeyId")?.toString();

    if (!name || !host || !port || !username || (!password && !rawSSHKeyId)) {
        throw new Error("Missing required fields");
    }

    const sshKeyId = rawSSHKeyId ? parseInt(rawSSHKeyId) : null

    await db.server.create({
        data: {
            name,
            host,
            port: parseInt(port),
            username,
            password: password ? encryptSecret(password) : "",
            sshKeyId: sshKeyId || null,
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
            password: encryptSecret(password),
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
        where: {OR: [{email}, {username}]},
    });

    if (existingUser) {
        throw new Error("User with the same email or username already exists");
    }

    const passwordHash = await hashPassword(password);

    const user = await db.user.create({
        data: {
            username,
            email,
            password: passwordHash,
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

    const user = await db.user.findUnique({where: {email}});

    if (!user) {
        throw new Error("Invalid email or password");
    }

    const isPasswordValid = await verifyPassword(password, user.password);

    if (!isPasswordValid) {
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

export async function updateUsername(newUsername: string) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    await db.user.update({
        where: {id: user.id},
        data: {username: newUsername},
    })

    revalidatePath("/")
}

export async function uploadAvatar(formData: FormData) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const file = formData.get("avatar") as File;

    if (!file) {
        throw new Error("No file selected");
    }
    console.log(file);

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const uploadDir = path.join(process.cwd(), "avatars")
    await mkdir(uploadDir, {recursive: true});

    const filePath = path.join(uploadDir, `${user.id}.png`)
    await writeFile(filePath, buffer);

    revalidatePath("/")
}

export async function changePassword(currentPassword: string, newPassword: string) {
    const user = await getCurrentUser();

    if (!user) {
        throw new Error("Unauthorized");
    }

    const userDB = await db.user.findUnique({
        where: {id: user.id},
        select: {password: true}
    })

    if (!userDB) {
        throw new Error("User not found");
    }

    const isCurrentPasswordValid = await verifyPassword(currentPassword, userDB.password);

    if (!isCurrentPasswordValid) {
        throw new Error("Invalid current password");
    }

    const passwordHash = await hashPassword(newPassword);

    await db.user.update({
        where: {id: user.id},
        data: {password: passwordHash, passwordUpdatedAt: new Date()}
    })

    await db.session.deleteMany({
        where: {userId: user.id},
    })

    await setSessionCookie(user.id)

    revalidatePath("/")
}