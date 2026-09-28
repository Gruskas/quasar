import {NextResponse} from "next/server";
import {readFile} from "fs/promises";
import path from "path";

export async function GET(_request: Request, {params}: { params: Promise<{ userId: string }> }) {
    const {userId} = await params;

    const filePath = path.join(
        process.cwd(),
        "avatars",
        `${userId}.png`
    );

    try {
        const fileBuffer = await readFile(filePath);

        return new NextResponse(fileBuffer, {
            headers: {
                "Content-Type": "image/png",
                "Cache-Control": "public, max-age=3600",
            },
        });
    } catch {
        return new NextResponse(null, {
            status: 404,
        });
    }
}