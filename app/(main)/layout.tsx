import {redirect} from "next/navigation"
import {getCurrentUser} from "@/lib/auth"
import {UserProvider} from "@/components/providers/user-provider"
import {AppSidebar} from "@/components/sidebar/app-sidebar"
import {SidebarInset, SidebarProvider, SidebarTrigger} from "@/components/ui/sidebar"
import {Separator} from "@/components/ui/separator"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbList,
    BreadcrumbPage,
} from "@/components/ui/breadcrumb"
import {VaultProvider} from "@/components/providers/vault-provider";
import {getVaults} from "@/lib/vault";

export default async function DashboardLayout({children}: { children: React.ReactNode }) {
    const user = await getCurrentUser()

    if (!user) {
        redirect("/login")
    }

    const keys = await getVaults(user.id)

    return (
        <UserProvider user={user}>
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
                    <VaultProvider keys={keys}>
                        {children}
                    </VaultProvider>
                </SidebarInset>
            </SidebarProvider>
        </UserProvider>
    )
}