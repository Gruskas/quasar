"use client"

import {VaultCard} from "@/components/vault-card"
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react";
import {useState} from "react";
import VaultForm, {SSHKeyData, VaultFormMode} from "@/components/vault-form";

export function VaultView({keys}: { keys: SSHKeyData[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<VaultFormMode>("add")
    const [selectedKey, setSelectedKey] = useState<SSHKeyData | null>(null)

    const handleOpenAdd = () => {
        setMode("add")
        setSelectedKey(null)
        setIsOpen(true)
    }

    const handleOpenEdit = (key: SSHKeyData) => {
        setMode("edit")
        setSelectedKey(key)
        setIsOpen(true)
    }

    return (
        <div className="flex h-full w-full overflow-hidden">
            <div className="flex flex-1 flex-col gap-6 p-6">
                <div className="flex items-center">
                    <Button onClick={handleOpenAdd} className="rounded-full font-bold">
                        <Plus/>
                        Add key
                    </Button>
                </div>

                <div className="space-y-3">
                    <h2 className="text-sm text-muted-foreground">Keys</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {keys.map((key) => (
                            <VaultCard
                                key={key.id}
                                name={key.name}
                                onEdit={() => handleOpenEdit(key)}
                            />
                        ))}
                    </div>
                </div>
            </div>
            <VaultForm
                method={mode}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                initialData={selectedKey}
            />
        </div>
    )
}