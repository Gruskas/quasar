import {AppSidebar} from "@/components/app-sidebar"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {Separator} from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Activity, AlertCircle, Server} from "lucide-react";
import {ServersTable} from "@/components/table"
import {ServerDialog} from "@/components/server-dialog";

export default function Home() {
    return (
        <SidebarProvider>
            <AppSidebar/>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b">
                    <div className="flex items-center gap-2 px-3">
                        <SidebarTrigger/>
                        <Separator orientation="vertical" className="mr-2 h-4"/>
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Main</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <Card className="flex-1">
                            <CardHeader className="flex flex-row justify-between pb-2">
                                <CardTitle className="text-sm font-medium">All Servers</CardTitle>
                                <Server className="h-4 w-4 text-muted-foreground"/>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-between pb-2">
                                <div className="text-2xl font-bold">12</div>
                                <ServerDialog/>
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

                    <ServersTable/>

                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
