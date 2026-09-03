import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {Card} from "@/components/ui/card"
import {db} from "@/lib/db"
import {ServerActionsMenu} from "@/components/server-actions-menu"

export async function ServersTable() {
    const servers = await db.server.findMany({
        orderBy: {createdAt: "desc"},
    })

    return (
        <Card className="min-h-screen flex-1 rounded-xl md:min-h-min p-4">
            <Table aria-label="Servers List">
                <TableHeader>
                    <TableHead isRowHeader className="p-2 font-semibold text-left">Name</TableHead>
                    <TableHead className="p-2 font-semibold text-left">IP / Host</TableHead>
                    <TableHead className="p-2 font-semibold text-left">Port</TableHead>
                    <TableHead className="p-2 font-semibold text-left">User</TableHead>
                    <TableHead className="p-2 font-semibold text-left">Status</TableHead>
                    <TableHead className="p-2 font-semibold text-left">Actions</TableHead>
                </TableHeader>
                <TableBody>
                    {servers.map((server) => (
                        <TableRow key={server.id} className="border-b">
                            <TableCell className="p-2 font-medium">{server.name}</TableCell>
                            <TableCell className="p-2">{server.host}</TableCell>
                            <TableCell className="p-2">{server.port}</TableCell>
                            <TableCell className="p-2">{server.username}</TableCell>
                            <TableCell className="p-2 text-emerald-500 font-semibold">Online</TableCell>
                            <TableCell className="p-2">
                                <ServerActionsMenu server={server}/>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Card>
    )
}