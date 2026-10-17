import {getVaults} from "@/lib/vault";
import {VaultView} from "@/components/vault/vault-view";

export default async function VaultPage() {
    const keys = await getVaults()
    return <VaultView keys={keys}/>
}