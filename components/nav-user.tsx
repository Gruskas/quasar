"use client"

import {
    Avatar,
    AvatarFallback,

} from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar"
import {ChevronsUpDownIcon, LogOutIcon, SettingsIcon} from "lucide-react"

import {useUser} from "@/components/user-provider"
import {logout} from "@/app/actions";

export function NavUser() {
    const user = useUser()
    const {isMobile} = useSidebar()
    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenuTrigger>
                    <SidebarMenuButton size="lg" className="aria-expanded:bg-muted">
                        <Avatar>
                            {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-medium">{user?.username}</span>
                            {/*<span className="truncate text-xs">{user.email}</span>*/}
                        </div>
                        <ChevronsUpDownIcon className="ml-auto size-4"/>
                    </SidebarMenuButton>
                    <DropdownMenu
                        className="min-w-56 rounded-lg"
                        placement={isMobile ? "bottom end" : "right bottom"}
                        offset={4}
                    >
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="p-0 font-normal">
                                <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                    <Avatar>
                                        {/*<AvatarImage src={user.avatar} alt={user.name} />*/}
                                        <AvatarFallback>CN</AvatarFallback>
                                    </Avatar>
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-medium">{user?.username}</span>
                                        {/*<span className="truncate text-xs">{user.email}</span>*/}
                                    </div>
                                </div>
                            </DropdownMenuLabel>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuGroup>
                            <DropdownMenuItem>
                                <SettingsIcon/>
                                settings
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem onAction={() => logout()}>
                            <LogOutIcon/> Log out
                        </DropdownMenuItem>
                    </DropdownMenu>
                </DropdownMenuTrigger>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}
