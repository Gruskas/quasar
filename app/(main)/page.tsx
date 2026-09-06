import {ServersTable} from "@/components/table"
import {ServersOverview} from "@/components/servers-overview";
import {Suspense} from "react";
import {getServersWithStatus} from "@/lib/get-servers";
import {redirect} from "next/navigation";

import {getCurrentUser} from "@/lib/auth"


export default async function Home() {
    const user = await getCurrentUser()
    if (!user) {
        redirect("/login");
    }

    const servers = await getServersWithStatus(user.id);

    return (
        <div className="flex flex-1 flex-col gap-4 p-4">
            <Suspense fallback={<div className="h-28 rounded-xl bg-muted/50 animate-pulse"/>}>
                <ServersOverview servers={servers}/>
            </Suspense>

            <Suspense fallback={<div className="h-64 rounded-xl bg-muted/50 animate-pulse"/>}>
                <ServersTable servers={servers}/>
            </Suspense>
        </div>
    )
}
