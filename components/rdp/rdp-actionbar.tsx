import {Button} from "@/components/ui/button";
import {DownloadIcon, Plus} from "lucide-react";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

export function RDPActionBar({onAdd, connectionMode, onModeChange}: {
    onAdd: () => void;
    connectionMode: string,
    onModeChange: (mode: string) => void
}) {

    return (
        <div className="flex items-center justify-between">
            <Button className="rounded-full font-bold"
                    onClick={onAdd}
            >
                <Plus/>
                Add RDP Connection
            </Button>

            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-1 cursor-pointer hover:text-emerald-400">
                    <DownloadIcon className="h-4 w-4"/>
                    <a href="/enable-rdp-links.reg" download="enable-rdp-links.reg"
                       className="text-sm">
                        Enable RDP Links
                    </a>
                </div>

                <div>
                    <Select
                        value={connectionMode}
                        onChange={(value) => onModeChange(String(value))}
                    >
                        <SelectTrigger className="w-full">
                            <SelectValue/>
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem id="bat" value="bat">
                                Script (.BAT File)
                            </SelectItem>
                            <SelectItem id="uri" value="uri">
                                Direct Link (URI)
                            </SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    )
}