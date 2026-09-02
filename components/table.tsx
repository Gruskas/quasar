"use client"
import {Table, TableBody, TableCell, TableHeader} from "@/components/ui/table";
import {Card} from "@/components/ui/card"
import {Button, Column, Row} from "react-aria-components";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import {MoreHorizontalIcon} from "lucide-react"

interface ServerData {
    name: string
    ip: string
    port: number
    user: string
    status: "Online" | "Offline"
}

const Servers: ServerData[] = [
    {name: "VPS Main", ip: "192.168.1.10", port: 22, user: "me", status: "Online" },
    {name: "VPS", ip: "192.168.1.11", port: 1337, user: "me", status: "Offline" },
]
export function ServersTable() {
    return (
        <Card className="min-h-screen flex-1 rounded-xl md:min-h-min p-4">
            <Table aria-label="Servers List">
                <TableHeader>
                    <Column isRowHeader className="p-2 font-semibold text-left">Name</Column>
                    <Column className="p-2 font-semibold text-left">IP / Host</Column>
                    <Column className="p-2 font-semibold text-left">Port</Column>
                    <Column className="p-2 font-semibold text-left">User</Column>
                    <Column className="p-2 font-semibold text-left">Status</Column>
                    <Column className="p-2 font-semibold text-left">Button</Column>
                </TableHeader>
                <TableBody>

                    {Servers.map((server, index) => (
                        <Row id={index} key={index} className="border-b">
                            <TableCell className="p-2 font-medium">{server.name}</TableCell>
                            <TableCell className="p-2">{server.ip}</TableCell>
                            <TableCell className="p-2">{server.port}</TableCell>
                            <TableCell className="p-2">{server.user}</TableCell>
                            <TableCell className="p-2 text-rose-500 font-semibold">{server.status}</TableCell>
                            <TableCell className="p-2">
                                <DropdownMenuTrigger>
                                    <Button
                                        type="button"
                                        aria-label="More options"
                                        className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-background text-muted-foreground transition hover:bg-accent hover:text-accent-foreground"
                                    >
                                        <MoreHorizontalIcon className="h-4 w-4"/>
                                    </Button>
                                    <DropdownMenu placement="bottom end">
                                        <DropdownMenuItem>View</DropdownMenuItem>
                                        <DropdownMenuItem>Edit</DropdownMenuItem>
                                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                                    </DropdownMenu>
                                </DropdownMenuTrigger>
                            </TableCell>
                        </Row>
                    ))}

                </TableBody>
            </Table>
        </Card>
    )
}