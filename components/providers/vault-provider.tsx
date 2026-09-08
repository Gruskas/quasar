"use client"

import {createContext, useContext} from "react"

export interface SSHKeyOption {
    id: string | number
    name: string
}

const VaultContext = createContext<SSHKeyOption[]>([])

export function VaultProvider({keys, children,}: { keys: SSHKeyOption[], children: React.ReactNode }) {
    return <VaultContext.Provider value={keys}>{children}</VaultContext.Provider>
}

export const useVaultKeys = () => useContext(VaultContext)