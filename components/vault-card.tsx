import {KeyRound} from "lucide-react"

export function VaultCard({name}: { name: string }) {
    return (
        <div
            className="flex items-center gap-3 rounded-2xl border border-border/40 bg-card/80 p-3.5 transition-colors duration-300 hover:border-white">
            <div
                className="flex h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                <KeyRound className="h-5 w-5"/>
            </div>

            <div className="flex flex-col min-w-0">
        <span className="font-semibold text-sm text-foreground truncate">
          {name}
        </span>
                <span className="text-xs text-muted-foreground">
          SSH Key
        </span>
            </div>
        </div>
    )
}