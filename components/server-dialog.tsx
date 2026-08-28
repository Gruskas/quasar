"use client"

import {useState} from "react"
import {Button} from "react-aria-components"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Dialog,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
    DialogTrigger
} from "@/components/ui/dialog"

export function ServerDialog() {
    const [isOpen, setIsOpen] = useState(false)

    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button className="flex h-9 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
            >Add Server</Button>

            <Dialog aria-label="Add new server">
                <DialogHeader>
                    <DialogTitle>Add new server</DialogTitle>
                    <DialogDescription>
                        Enter the access credentials for the new VPS / Dedicated server.
                    </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Server Name</Label>
                        <Input id="name" name="name" placeholder="e.g., VPS Main" autoFocus/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="ip">IP / Host</Label>
                        <Input id="ip" name="ip" placeholder="192.168.1.10"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="port">Port</Label>
                        <Input id="port" name="port" placeholder="22" defaultValue="22"/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="user">User</Label>
                        <Input id="user" name="user" placeholder="root"/>
                    </div>
                </div>

                <DialogFooter className="grid grid-cols-2 w-full pb-2">
                    <Button
                        onPress={() => setIsOpen(false)}
                        className="h-9 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                    >Cancel</Button>
                    <Button
                        onPress={() => setIsOpen(false)}
                        className="h-9 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
                    >Save</Button>
                </DialogFooter>
            </Dialog>
        </DialogTrigger>
    )
}