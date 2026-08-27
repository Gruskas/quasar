"use client"
import {Table, TableBody, TableCell, TableHeader} from "@/components/ui/table";
import { Card } from "@/components/ui/card"
import {Column, Row} from "react-aria-components";

export function ServersTable() {
    return (
        <Card className="min-h-screen flex-1 rounded-xl md:min-h-min p-4">
            <Table aria-label="Servers List">
                <TableHeader>
                    <Column isRowHeader className="p-2 font-semibold text-left">Name</Column>
                    <Column className="p-2 font-semibold text-left">IP / Host</Column>
                    <Column className="p-2 font-semibold text-left">Port</Column>
                    <Column className="p-2 font-semibold text-left">Status</Column>
                    <Column className="p-2 font-semibold text-left">Ping</Column>
                </TableHeader>
                <TableBody>
                    <Row id="server-1" className="border-b">
                        <TableCell className="p-2 font-medium">VPS Main</TableCell>
                        <TableCell className="p-2">192.168.1.10</TableCell>
                        <TableCell className="p-2">22</TableCell>
                        <TableCell className="p-2 text-emerald-500 font-semibold">Online</TableCell>
                        <TableCell className="p-2">12 ms</TableCell>
                    </Row>
                </TableBody>
            </Table>
        </Card>
    )
}