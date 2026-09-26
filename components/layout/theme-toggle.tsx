"use client"
import {MoonStar, Sun} from "lucide-react";
import {useTheme} from "next-themes";
import {Label} from "@/components/ui/label"
import {Switch} from "@/components/ui/switch"

export function ThemeToggle() {
    const {theme, setTheme} = useTheme();

    const handleThemeToggle = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }

    return (
        <div className="flex items-center w-full gap-3">
            <div className="flex items-center gap-2">
                {theme === "light" ? (
                    <Sun/>
                ) : (<MoonStar/>
                )}
                <Label htmlFor="themeToggle">
                    {theme === "light" ? "Light Mode" : "Dark Mode"}
                </Label>

            </div>
            <Switch id="themeToggle" className="flex items-center w-full"
                    onClick={() => handleThemeToggle()}
            >
            </Switch>
        </div>
    )
}