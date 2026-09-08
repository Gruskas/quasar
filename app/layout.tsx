import type {Metadata} from "next";
import "./globals.css";
import {Inter} from "next/font/google";

import {cn} from "@/lib/utils";
import {ThemeProvider} from "next-themes";

const inter = Inter({subsets: ["latin"], variable: "--font-sans"});

export const metadata: Metadata = {
    title: "Quasar",
    icons: "/quasar.ico"
};

export default function RootLayout({children}: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("font-sans", inter.variable)}
        >
        <body className="min-h-screen bg-background text-foreground">
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
            disableTransitionOnChange
        >
            {children}
        </ThemeProvider>
        </body>
        </html>
    );
}
