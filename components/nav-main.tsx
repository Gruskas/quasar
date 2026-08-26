"use client"

import {
    Collapsible,
    CollapsibleContent,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import {ChevronRightIcon} from "lucide-react"

export function NavMain({
                            items,
                        }: {
    items: {
        title: string
        url: string
        icon: React.ReactNode
        isActive?: boolean
        items?: {
            title: string
            url: string
        }[]
    }[]
}) {
    return (
        <SidebarGroup>
            <SidebarMenu>
                {items.map((item) => (
                    <Collapsible
                        key={item.title}
                        defaultExpanded={item.isActive}
                        render={(props) => <SidebarMenuItem {...props} />}
                    >
                        <SidebarMenuButton href={item.url} tooltip={item.title}>
                            {item.icon}
                            <span>{item.title}</span>
                        </SidebarMenuButton>
                        {item.items?.length ? (
                            <>
                                <SidebarMenuAction
                                    slot="trigger"
                                    className="aria-expanded:rotate-90"
                                >
                                    <ChevronRightIcon
                                    />
                                    <span className="sr-only">Toggle</span>
                                </SidebarMenuAction>
                                <CollapsibleContent>
                                    <SidebarMenuSub>
                                        {item.items?.map((subItem) => (
                                            <SidebarMenuSubItem key={subItem.title}>
                                                <SidebarMenuSubButton href={subItem.url}>
                                                    <span>{subItem.title}</span>
                                                </SidebarMenuSubButton>
                                            </SidebarMenuSubItem>
                                        ))}
                                    </SidebarMenuSub>
                                </CollapsibleContent>
                            </>
                        ) : null}
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
