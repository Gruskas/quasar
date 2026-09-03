"use client"

import { Button } from "react-aria-components"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { MoreHorizontalIcon } from "lucide-react"

import { deleteServer } from "@/app/actions";

export function ServerActionsMenu({ serverId }: { serverId: number }) {
    return (
        <DropdownMenuTrigger>
            <Button
                type="button"
                aria-label="More options"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-accent-foreground outline-none cursor-pointer"
            >
                <MoreHorizontalIcon className="h-4 w-4"/>
            </Button>
            <DropdownMenu placement="bottom end">
                <DropdownMenuItem>View</DropdownMenuItem>
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem className="text-destructive" onClick={() => {deleteServer(serverId)}}>Delete
                    Delete
                </DropdownMenuItem>
            </DropdownMenu>
        </DropdownMenuTrigger>
    )
}