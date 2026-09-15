import {Monitor, PlayIcon, SquarePenIcon} from "lucide-react"
import {generateRdpBatchFile, getRdpConnectionLink} from "@/lib/rdp";
import {RdpConnectionStatus} from "@/components/rdp/rdp-connection-status";

export function RDPCard({name, id, host, port, connectionMode, onEdit}: {
    name: string;
    id: number;
    host: string;
    port: number;
    connectionMode: string;
    onEdit: () => void
}) {

    const handleDownload = async () => {
        const batchFile = await generateRdpBatchFile(id)
        const blob = new Blob([batchFile], {type: "application/bat"})
        const url = URL.createObjectURL(blob)
        const link = document.createElement("a");
        link.href = url;
        link.download = `${name}.bat`
        link.click()
    }

    const handleConnect = async () => {
        const rdpUrl = await getRdpConnectionLink(id)
        window.location.href = rdpUrl
    }

    return (
        <div
            className="group flex flex-col gap-3 rounded-2xl border border-border/40 bg-card/80 p-3.5 transition-colors duration-300 hover:border-white">
            <div
                className="flex items-center gap-3">
                <div
                    className="flex shrink-0 h-11 w-11 items-center justify-center rounded-xl bg-blue-950 text-white">
                    <Monitor className="h-5 w-5 text-blue-400"/>
                </div>

                <div className="flex flex-col min-w-0">
                <span className="font-semibold text-sm text-foreground truncate">
                    {name}
                </span>
                    <span className="font-semibold text-xs text-muted-foreground truncate">
                    {host}:{port}
                </span>
                </div>
            </div>
            <div>
                <div className="flex flex-col min-w-0 flex-1">
                    <RdpConnectionStatus host={host} port={port}/>
                </div>

                <div className="flex items-center justify-end gap-1 pt-2 w-full">
                    <button onClick={connectionMode === "bat" ? handleDownload : handleConnect}
                            className="flex p-2 gap-1 rounded-lg w-full bg-blue-500 text-xs font-semibold items-center justify-center text-white">
                        <PlayIcon className="h-4 w-4"/>
                        <span>Connect</span>
                    </button>
                    <button
                        onClick={onEdit}
                        className="p-2 rounded-lg">
                        <SquarePenIcon className="h-5 w-5"/>
                    </button>
                </div>
            </div>
        </div>
    )
}