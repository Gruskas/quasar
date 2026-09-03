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

import {addServer} from "@/app/actions";

type ServerDialogMode = "add" | "edit"

export function ServerDialog({method}: { method: ServerDialogMode }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            <Button
                className="flex h-9 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
            >Add Server</Button>

            <Dialog aria-label={method === "add" ? "Add new server" : "Edit server"}>
                <form action={addServer} onSubmit={() => setIsOpen(false)}>
                    <DialogHeader>
                        <DialogTitle>{method === "add" ? "Add new server" : "Edit server"}</DialogTitle>
                        <DialogDescription>
                            {method === "add" ? "Enter the access credentials for the new VPS / Dedicated server." : "Update the access credentials for the server."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Server Name</Label>
                            <Input id="name" name="name" placeholder="e.g., VPS Main" autoFocus/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="host">IP / Host</Label>
                            <Input id="host" name="host" placeholder="192.168.1.10"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="port">Port</Label>
                            <Input id="port" name="port" placeholder="22" defaultValue="22"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">User</Label>
                            <Input id="username" name="username" placeholder="root"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input id="password" name="password" type="password" placeholder="••••••••"/>
                        </div>
                    </div>

                    <DialogFooter className="grid grid-cols-2 w-full pb-2">
                        <Button
                            onPress={() => setIsOpen(false)}
                            className="h-9 rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground cursor-pointer"
                        >Cancel</Button>
                        <Button type={"submit"}
                                className="h-9 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer"
                        >
                            {method === "add" ? "Add" : "Update"}
                        </Button>
                    </DialogFooter>
                </form>
            </Dialog>
        </DialogTrigger>
    )
}