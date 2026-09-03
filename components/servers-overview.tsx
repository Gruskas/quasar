import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, AlertCircle, Server} from "lucide-react";
import {ServerDialog} from "@/components/server-dialog";


export async function ServersOverview() {
return (
    <div className="flex flex-col md:flex-row gap-4">
        <Card className="flex-1">
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle className="text-sm font-medium">All Servers</CardTitle>
                <Server className="h-4 w-4 text-muted-foreground"/>
            </CardHeader>
            <CardContent className="flex flex-row justify-between pb-2">
                <div className="text-2xl font-bold">12</div>
                <ServerDialog method="add"/>
            </CardContent>
        </Card>

        <Card className="flex-1">
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle className="text-sm font-medium">Online</CardTitle>
                <Activity className="h-4 w-4 text-emerald-500"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-emerald-500">10</div>
            </CardContent>
        </Card>

        <Card className="flex-1">
            <CardHeader className="flex flex-row justify-between pb-2">
                <CardTitle className="text-sm font-medium">Offline</CardTitle>
                <AlertCircle className="h-4 w-4 text-rose-500"/>
            </CardHeader>
            <CardContent>
                <div className="text-2xl font-bold text-rose-500">2</div>
            </CardContent>
        </Card>
    </div>
)
}