"use client"

import {Button} from "react-aria-components"
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {MoreHorizontalIcon} from "lucide-react"

import {deleteServer} from "@/app/actions";
import {ServerDialog, type ServerData} from "@/components/server-dialog";
import {useState} from "react";

export function ServerActionsMenu({server}: { server: ServerData }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    return (
        <>
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
                    <DropdownMenuItem onAction={() => setIsDialogOpen(true)}>
                        Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive" onAction={() => deleteServer(server.id)}>
                        Delete
                    </DropdownMenuItem>
                </DropdownMenu>
            </DropdownMenuTrigger>

            {isDialogOpen && (
                <ServerDialog
                    method="edit"
                    initialData={server}
                    isOpen={isDialogOpen}
                    onOpenChange={setIsDialogOpen}
                />
            )}
        </>
    )
}