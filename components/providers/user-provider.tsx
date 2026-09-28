"use client"

import {createContext, useContext} from "react"

type User = { id: string; username: string; email: string; avatar: string; passwordUpdatedAt: Date} | null

const UserContext = createContext<User>(null)

export function UserProvider({user, children,}: {
    user: User
    children: React.ReactNode
}) {
    return <UserContext.Provider value={user}>{children}</UserContext.Provider>
}

export function useUser() {
    return useContext(UserContext)
}