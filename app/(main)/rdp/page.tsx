import {RDPView} from "@/components/rdp/rdp-view";
import {getRDPConnections} from "@/lib/rdp";

export default async function VaultPage() {
    const desktops = await getRDPConnections()

    return <RDPView desktops={desktops}/>
}