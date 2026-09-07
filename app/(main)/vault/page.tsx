import {getVaults} from "@/lib/vault";
import {getCurrentUser} from "@/lib/auth";
import {VaultView} from "@/components/vault/vault-view";

export default async function VaultPage() {
    const user = (await getCurrentUser())!
    const keys = await getVaults(user.id)

    return <VaultView keys={keys}/>
}