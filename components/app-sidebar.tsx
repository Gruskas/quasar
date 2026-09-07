"use client"

import * as React from "react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
    TerminalSquareIcon,
    Notebook,
} from "lucide-react"

const data = {
    navMain: [
        {
            title: "Servers",
            url: "/",
            icon: (
                <TerminalSquareIcon
                />
            ),
            isActive: true,
            items: [
                {
                    title: "Vault",
                    url: "/vault",
                },
            ],
        },
        {
            title: "Notebook",
            url: "#",
            icon: (
                <Notebook
                />
            ),
            items: [
                {
                    title: "General",
                    url: "#",
                }
            ],
        },
        {
            title: "TODO",
            url: "#",
            icon: (
                <Notebook
                />
            ),
            items: [
                {
                    title: "General",
                    url: "#",
                }
            ],
        }
    ]
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton href="/" size="lg">
                            <div className="flex-1 text-center text-3xl leading-tight">
                                <span className="truncate font-bold">Quasar</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    )
}
