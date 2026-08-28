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
                    <Row id="server-1" className="border-b">
                        <TableCell className="p-2 font-medium">VPS Main</TableCell>
                        <TableCell className="p-2">192.168.1.10</TableCell>
                        <TableCell className="p-2">22</TableCell>
                        <TableCell className="p-2">me</TableCell>
                        <TableCell className="p-2 text-emerald-500 font-semibold">Online</TableCell>
                        <TableCell className="p-2">

                        </TableCell>
                    </Row>
                    <Row id="server-2" className="border-b">
                        <TableCell className="p-2 font-medium">VPS</TableCell>
                        <TableCell className="p-2">192.168.1.11</TableCell>
                        <TableCell className="p-2">1337</TableCell>
                        <TableCell className="p-2">me</TableCell>
                        <TableCell className="p-2 text-rose-500 font-semibold">Offline</TableCell>
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

                </TableBody>
            </Table>
        </Card>
    )
}