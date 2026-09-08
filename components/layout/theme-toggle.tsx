"use client"
import {MoonStar, Sun} from "lucide-react";
import {useTheme} from "next-themes";

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <div className="flex items-center gap-2 px-3">
            <button className="flex items-center gap-2 px-3 w-full"
                    onClick={() => handleThemeToggle()}
            >
                {theme === "light" ? (
                    <Sun/>
                ) : (<MoonStar/>
                )}
            </button>
        </div>
    )
}