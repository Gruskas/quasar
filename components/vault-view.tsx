"use client"

import {VaultCard} from "@/components/vault-card"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {addSSHKey} from "@/app/vault";
import {Label} from "@/components/ui/label";
import {Plus, X} from "lucide-react";
import {useState} from "react";

export function VaultView({keys}: { keys: { id: number, name: string }[] }) {
    const [isOpen, setIsOpen] = useState(false)
    return (
        <div className="flex h-full w-full overflow-hidden">
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center">
                    <Button onClick={() => setIsOpen(true)} className="rounded-full font-bold">
                        <Plus/>
                        Add key
                    </Button>
                </div>

                <div className="space-y-3">
                    <h2 className="text-sm text-muted-foreground">Keys</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {keys.map((key) => (
                            <VaultCard key={key.id} name={key.name}/>
                        ))}
                    </div>
                </div>
            </div>

            <aside
                className={`transition-all duration-700 ease-in-out shrink-0 border-l border-border overflow-hidden ${
                    isOpen ? "w-80 opacity-100" : "w-0 opacity-0 border-none"
                }`}>
                <div className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                        <h1 className="text-lg font-bold">Add Key</h1>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setIsOpen(false)}
                        >
                            <X/>
                        </Button>
                    </div>

                    <form action={addSSHKey} className="space-y-6">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" placeholder={"e.g., My SSH Key"}
                                   autoFocus required/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="publicKey">Public Key</Label>
                            <Input id="publicKey" name="publicKey"
                                   placeholder="ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQD..."/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="privateKey">Private Key</Label>
                            <Input id="privateKey" name="privateKey" placeholder="-----BEGIN RSA PRIVATE KEY-----"
                                   required/>
                        </div>
                        <Button type="submit" className="w-full">
                            Save Key
                        </Button>
                    </form>
                </div>
            </aside>
        </div>
    )
}