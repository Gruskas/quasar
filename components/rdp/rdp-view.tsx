"use client"

import {useState} from "react";
import {VaultFormMode} from "@/components/vault/vault-form";
import {RDPCard} from "@/components/rdp/rdp-card";
import {RDPActionBar} from "@/components/rdp/rdp-actionbar";
import RDPForm, {RDPData} from "@/components/rdp/rdp-form";


export function RDPView({desktops}: { desktops: RDPData[] }) {
    const [isOpen, setIsOpen] = useState(false)
    const [mode, setMode] = useState<VaultFormMode>("add")
    const [selectedDesktop, setSelectedDesktop] = useState<RDPData | null>(null)
    const [connectionMode, setConnectionMode] = useState(() => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("rdp-connection-mod") ?? "bat"
        }
        return "bat"
    })

    const handleModeChange = (mode: string) => {
        setConnectionMode(mode)
        localStorage.setItem("rdp-connection-mode", mode)
    }

    const handleOpenAdd = () => {
        setMode("add")
        setSelectedDesktop(null)
        setIsOpen(true)
    }

    const handleOpenEdit = (connection: RDPData) => {
        setMode("edit")
        setSelectedDesktop(connection)
        setIsOpen(true)
    }

    return (
        <div className="flex h-full w-full overflow-hidden">
            <div className="flex flex-1 flex-col gap-6 p-6">

                <RDPActionBar
                    onAdd={handleOpenAdd}
                    connectionMode={connectionMode}
                    onModeChange={handleModeChange}
                />

                <div className="space-y-3">
                    <h2 className="text-sm text-muted-foreground">Available Connections</h2>
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {desktops.map((desktop) => (
                            <RDPCard
                                key={desktop.id}
                                id={desktop.id}
                                name={desktop.name}
                                connectionMode={connectionMode}
                                onEdit={() => handleOpenEdit(desktop)}
                            />
                        ))}
                    </div>
                </div>
            </div>

            <RDPForm
                method={mode}
                isOpen={isOpen}
                onOpenChange={setIsOpen}
                initialData={selectedDesktop}
            />
        </div>
    )
}