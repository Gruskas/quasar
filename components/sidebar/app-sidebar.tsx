"use client"

import * as React from "react"

import {NavMain} from "@/components/sidebar/nav-main"
import {NavUser} from "@/components/sidebar/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem, SidebarSeparator,
} from "@/components/ui/sidebar"
import {
    TerminalSquareIcon,
    Notebook, MonitorIcon, LockKeyholeIcon,
} from "lucide-react"
import {Separator} from "@/components/ui/separator";

const data = {
    navMain: [
        {
            title: "Servers",
            url: "/",
            icon: <TerminalSquareIcon/>,
        },
        {
            title: "Vault",
            url: "/vault",
            icon: <LockKeyholeIcon/>,
        },
        {
            title: "RDP",
            url: "/rdp",
            icon: <MonitorIcon/>,
        },
    ],
    navSecondary: [
        {
            title: "Notebook",
            url: "#",
            icon: <Notebook/>,
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
            icon: <Notebook/>,
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
                        <SidebarMenuButton href="/" size="lg"
                                           className="rounded-none hover:bg-transparent active:bg-transparent">
                            <div className="flex-1 text-center text-3xl leading-tight">
                                <span className="truncate font-bold">Quasar</span>
                            </div>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
                <Separator/>
                <NavMain items={data.navSecondary}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser/>
            </SidebarFooter>
        </Sidebar>
    )
}
