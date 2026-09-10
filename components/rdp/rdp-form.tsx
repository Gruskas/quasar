import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {Ellipsis, X} from "lucide-react";
import {useState} from "react";
import {DropdownMenu, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {addRDP, deleteRDP, updateRDP} from "@/lib/rdp";

export type RDPFormMode = "add" | "edit"

export interface RDPData {
    id: number
    name: string
    host: string
    port: number
    username: string
    password?: string
}

interface RDPFormProps {
    method: RDPFormMode
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    initialData: RDPData | null
}

export default function RDPForm({
                                    method,
                                    isOpen: controlledOpen,
                                    onOpenChange: setControlledOpen,
                                    initialData
                                }: RDPFormProps) {

    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isOpen = controlledOpen ?? uncontrolledOpen
    const setIsOpen = setControlledOpen ?? setUncontrolledOpen

    const handleSubmit = async (formData: FormData) => {
        if (method === "add") {
            await addRDP(formData)
        } else if (initialData?.id) {
            await updateRDP(initialData.id, formData)
        }
        setIsOpen(false)
    }

    return (
        <aside
            className={`transition-all duration-700 ease-in-out shrink-0 border-l border-border overflow-hidden ${
                isOpen ? "w-81 opacity-100" : "w-0 opacity-0 border-none"
            }`}>
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold truncate">
                        {method === "add" ? "Add Key" : "Edit Key"}
                    </h1>
                    <div className="flex items-center justify-end">
                        {method === "edit" && (
                            <DropdownMenuTrigger>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    aria-label="More options"
                                    className="h-8 w-8"
                                >
                                    <Ellipsis className="h-4 w-4"/>
                                </Button>
                                <DropdownMenu placement="bottom end">
                                    <DropdownMenuItem>
                                        Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem className="text-destructive" onAction={async () => {
                                        if (initialData?.id) {
                                            await deleteRDP(initialData.id)
                                        }
                                    }}>
                                        Delete
                                    </DropdownMenuItem>
                                </DropdownMenu>
                            </DropdownMenuTrigger>
                        )}
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => {
                                setIsOpen(false)
                            }}
                        >
                            <X/>
                        </Button>
                    </div>
                </div>

                <form action={handleSubmit} className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" autoFocus required
                               placeholder="e.g., Main PC"
                               defaultValue={initialData?.name}
                        />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                        <div className="col-span-2 grid gap-2">
                            <Label htmlFor="host">Host / IP</Label>
                            <Input id="host" name="host" required
                                   placeholder="192.168.1.10"
                                   defaultValue={initialData?.host}
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="port">Port</Label>
                            <Input id="port" name="port" type="number" required
                                   placeholder="3389"
                                   defaultValue={initialData?.port}
                            />
                        </div>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="username">Username</Label>
                        <Input id="username" name="username" required
                               placeholder="User"
                               defaultValue={initialData?.username}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="password">Password</Label>
                        <Input id="password" name="password" type="password" required
                               placeholder="••••••••"
                               defaultValue={initialData?.password}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        {method === "add" ? "Save RDP Connection" : "Update RDP Connection"}
                    </Button>
                </form>
            </div>
        </aside>
    )
}