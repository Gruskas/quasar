import {getCurrentUser} from "@/lib/auth"
import {redirect} from "next/navigation"
import {TerminalClient} from "@/app/terminal/[id]/terminal-client";
import {createTerminalTicket} from "@/lib/terminal-auth";

export default async function TerminalPage({params}: {
    params: Promise<{ id: string }>
}) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const {id} = await params
    const ticket = await createTerminalTicket(Number(id))
    return <TerminalClient serverId={id} ticket={ticket}/>
}