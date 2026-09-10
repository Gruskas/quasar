import {Button} from "@/components/ui/button";
import {Pencil, Plus} from "lucide-react";

export function RDPActionBar({onAdd}: { onAdd: () => void }) {
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
        </div>
    )
}