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

import {addServer, updateServer} from "@/lib/actions";
import {AuthMethodSelect} from "@/components/servers/auth-method-select";

type ServerDialogMode = "add" | "edit"

interface ServerDialogProps {
    method: ServerDialogMode
    isOpen?: boolean
    onOpenChange?: (open: boolean) => void
    initialData?: ServerData
}

export interface ServerData {
    id: number
    name?: string
    host?: string
    port?: number | string
    username?: string
    password?: string
}

export function ServerDialog({
                                 method,
                                 isOpen: controlledOpen,
                                 onOpenChange: setControlledOpen,
                                 initialData
                             }: ServerDialogProps) {

    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isOpen = controlledOpen ?? uncontrolledOpen
    const setIsOpen = setControlledOpen ?? setUncontrolledOpen

    const handleSubmit = async (formData: FormData) => {
        if (method === "add") {
            await addServer(formData)
        } else if (initialData?.id) {
            await updateServer(initialData.id, formData)
        }
        setIsOpen(false)
    }

    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            {method === "add" && (
                <Button
                    className="flex h-9 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 cursor-pointer">
                    Add Server
                </Button>
            )}

            <Dialog aria-label={method === "add" ? "Add new server" : "Edit server"}>
                <form action={handleSubmit}>
                    <DialogHeader>
                        <DialogTitle>{method === "add" ? "Add new server" : "Edit server"}</DialogTitle>
                        <DialogDescription>
                            {method === "add" ? "Enter the access credentials for the new VPS / Dedicated server." : "Update the access credentials for the server."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4 py-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Server Name</Label>
                            <Input id="name" name="name" placeholder="e.g., VPS Main" defaultValue={initialData?.name}
                                   autoFocus/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="host">IP / Host</Label>
                            <Input id="host" name="host" defaultValue={initialData?.host} placeholder="192.168.1.10"/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="port">Port</Label>
                            <Input id="port" name="port" placeholder="22" defaultValue={initialData?.port?.toString()}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="username">User</Label>
                            <Input id="username" name="username" defaultValue={initialData?.username}
                                   placeholder="root"/>
                        </div>

                        <AuthMethodSelect
                            defaultValue={initialData?.password}
                        />

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