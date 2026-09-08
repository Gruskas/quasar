"use client"

import {useState} from "react"
import {Plus} from "lucide-react"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {useVaultKeys} from "@/components/providers/vault-provider"

export function AuthMethodSelect({defaultValue}: { defaultValue?: string }) {
    const [useSSHKey, setUseSSHKey] = useState(false)
    const keys = useVaultKeys()

    return (
        useSSHKey ? (
            <div className="grid gap-2 w-full">
                <div className="flex justify-between">
                    <Label htmlFor="sshKeyId">SSH Key</Label>
                    <button
                        onClick={() => setUseSSHKey(false)}
                        className="text-xs text-zinc-400 underline cursor-pointer transition-colors duration-300 hover:text-zinc-200"
                    >
                        Use password instead
                    </button>
                </div>
                <Select name="sshKeyId" placeholder="SSH Key" isRequired>
                    <SelectTrigger id="sshKeyId" className="w-full">
                        <SelectValue/>
                    </SelectTrigger>
                    <SelectContent>
                        {keys.map((key) => (
                            <SelectItem key={key.id} id={key.id}>
                                {key.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        ) : (
            <div className="grid gap-2">
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" placeholder="••••••••"
                           defaultValue={defaultValue} required/>
                </div>
                <button
                    onClick={() => setUseSSHKey(true)}
                    className="flex items-center gap-1 text-xs font-medium text-zinc-400 py-1 px-2 -ml-2 rounded-md w-fit cursor-pointer transition-colors duration-300 hover:text-zinc-200 hover:bg-zinc-800/60"
                >
                    <Plus className="h-4 w-4"/>
                    SSH Key
                </button>
            </div>
        )
    )
}