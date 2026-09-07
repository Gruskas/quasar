"use client"

import {VaultCard} from "@/components/vault-card"
import {Button} from "@/components/ui/button"
import {Plus} from "lucide-react";
import {useState} from "react";
import VaultForm from "@/components/vault-form";

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
            <VaultForm
                isOpen={isOpen}
                onOpenChange={setIsOpen}
            />
        </div>
    )
}