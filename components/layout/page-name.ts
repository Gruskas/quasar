"use client"
import {usePathname} from "next/navigation";


export function PageName() {
    const pathName = usePathname()

    if (pathName === "/") return "Main"
    if (pathName === "/vault") return "Vault"
}