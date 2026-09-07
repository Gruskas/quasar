import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, AlertCircle, Server} from "lucide-react";
import {ServerDialog} from "@/components/servers/dialog";

export async function Overview({servers}: {
    servers: { id: number; name: string; host: string; port: number | string; username: string; isOnline: boolean }[]
}) {

    const totalServers = servers.length;
    const onlineServers = servers.filter(server => server.isOnline).length;
    const offlineServers = totalServers - onlineServers;

    return (
        <div className="flex flex-col md:flex-row gap-4">
            <Card className="flex-1">
                <CardHeader className="flex flex-row justify-between pb-2">
                    <CardTitle className="text-sm font-medium">All Servers</CardTitle>
                    <Server className="h-4 w-4 text-muted-foreground"/>
                </CardHeader>
                <CardContent className="flex flex-row justify-between pb-2">
                    <div className="text-2xl font-bold">{totalServers}</div>
                    <ServerDialog method="add"/>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader className="flex flex-row justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Online</CardTitle>
                    <Activity className="h-4 w-4 text-emerald-500"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-emerald-500">{onlineServers}</div>
                </CardContent>
            </Card>

            <Card className="flex-1">
                <CardHeader className="flex flex-row justify-between pb-2">
                    <CardTitle className="text-sm font-medium">Offline</CardTitle>
                    <AlertCircle className="h-4 w-4 text-rose-500"/>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold text-rose-500">{offlineServers}</div>
                </CardContent>
            </Card>
        </div>
    )
}