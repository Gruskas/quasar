import {Input} from "@/components/ui/input"
import {addSSHKey, updateSSHKey} from "@/app/vault";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {X} from "lucide-react";
import {useState} from "react";

export type VaultFormMode = "add" | "edit"

export interface SSHKeyData {
    id: number
    name: string
    publicKey?: string | null
    privateKey: string
}

interface VaultFormProps {
    method: VaultFormMode
    isOpen: boolean
    onOpenChange: (open: boolean) => void
    initialData: SSHKeyData | null
}

export default function VaultForm({
                                      method,
                                      isOpen: controlledOpen,
                                      onOpenChange: setControlledOpen,
                                      initialData
                                  }: VaultFormProps) {

    const [uncontrolledOpen, setUncontrolledOpen] = useState(false)
    const isOpen = controlledOpen ?? uncontrolledOpen
    const setIsOpen = setControlledOpen ?? setUncontrolledOpen

    const handleSubmit = async (formData: FormData) => {
        if (method === "add") {
            await addSSHKey(formData)
        } else if (initialData?.id) {
            await updateSSHKey(initialData.id, formData)
        }
        setIsOpen(false)
    }

    return (
        <aside
            className={`transition-all duration-700 ease-in-out shrink-0 border-l border-border overflow-hidden ${
                isOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-none"
            }`}>
            <div className="p-4 space-y-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-lg font-bold">
                        {method === "add" ? "Add Key" : "Edit Key"}
                    </h1>
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

                <form action={handleSubmit} className="space-y-6">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Name</Label>
                        <Input id="name" name="name" placeholder={"e.g., My SSH Key"} defaultValue={initialData?.name}
                               autoFocus required/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="publicKey">Public Key</Label>
                        <Input id="publicKey" name="publicKey" defaultValue={initialData?.publicKey ?? ""}
                               placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD..."/>
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="privateKey">Private Key</Label>
                        <Input id="privateKey" name="privateKey" defaultValue={initialData?.privateKey}
                               placeholder="-----BEGIN RSA PRIVATE KEY-----"
                               required/>
                    </div>
                    <Button type="submit" className="w-full">
                        {method === "add" ? "Save Key" : "Update Key"}
                    </Button>
                </form>
            </div>
        </aside>
    )
}