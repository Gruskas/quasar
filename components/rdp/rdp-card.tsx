import {Monitor, Pencil} from "lucide-react"
import {generateRdpBatchFile} from "@/lib/rdp";

export function RDPCard({name, id, onEdit}: { name: string; id: number; onEdit: () => void }) {

    const handleDownload = async () => {
        const batchFile = await generateRdpBatchFile(id)
        const blob = new Blob([batchFile], {type: "application/bat"})
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.bat`
        link.click()
    }

    return (
        <div
            className="group flex items-center gap-3 rounded-2xl border border-border/40 bg-card/80 p-3.5 transition-colors duration-300 hover:border-white">
            <div
                className="flex shrink-0 h-11 w-11 items-center justify-center rounded-xl bg-black text-white">
                <button
                    onClick={handleDownload}
                >
                    <Monitor className="h-5 w-5"/>
                </button>
            </div>

            <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-foreground truncate">
                    {name}
                </span>
            </div>
            <button
                onClick={onEdit}
                className="ml-auto p-2 opacity-0 rounded-lg transition-opacity duration-200 group-hover:opacity-100 hover:bg-zinc-950/20">
                <Pencil/>
            </button>
        </div>
    )
}