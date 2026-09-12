import {Button} from "@/components/ui/button";
import {Pencil, Plus} from "lucide-react";
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

            {/*<Button className="rounded-full font-bold">*/}
            {/*    <Pencil/>*/}
            {/*    Edit*/}
            {/*</Button>*/}
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
    )
}