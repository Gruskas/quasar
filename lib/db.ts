import { PrismaClient } from "@/lib/generated/prisma/client"
import path from "path"

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

const dbPath = path.join(process.cwd(), "prisma", "dev.db")

export const db =
    globalForPrisma.prisma ||
    new PrismaClient({
        datasources: {
            db: {
                url: `file:${dbPath}`,
            },
        },
    })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db