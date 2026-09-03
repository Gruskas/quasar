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
import {ServersTable} from "@/components/table"
import {ServersOverview} from "@/components/servers-overview";
import {Suspense} from "react";
import {getServersWithStatus} from "@/lib/get-servers";

export default async function Home() {
    const servers = await getServersWithStatus();
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
                    <Suspense fallback={<div className="h-28 rounded-xl bg-muted/50 animate-pulse"/>}>
                        <ServersOverview servers={servers}/>
                    </Suspense>

                    <Suspense fallback={<div className="h-64 rounded-xl bg-muted/50 animate-pulse"/>}>
                        <ServersTable servers={servers}/>
                    </Suspense>
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
