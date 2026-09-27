"use client"

import {useState} from "react";
import {
    Dialog,
    DialogFooter,
    DialogHeader,
} from "@/components/ui/dialog";
import {ProfileSection} from "./sections/profile-section";

const settings_sections = [
    {id: "profile", label: "Profile"},
    {id: "test", label: "Test"}
];

export function QuasarSettings({isOpen, onOpenChange}: {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}) {
    const [activeSection, setActiveSection] = useState<string>("profile");

    return (
        <Dialog
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            className="w-[35vw] max-w-none! h-2/3"
        >
            <DialogHeader className="pb-4">
                <span>Settings</span>
            </DialogHeader>

            <div className="flex flex-1 -m-5">
                <div className="w-48 border-r px-2 flex flex-col">
                    {settings_sections.map((section) => (
                        <button
                            key={section.id}
                            onClick={() => setActiveSection(section.id)}
                            className={`flex items-center px-3 py-2 rounded-xl transition-all duration-300 ${
                                activeSection === section.id 
                                    ? "bg-accent font-semibold"
                                    : "text-muted-foreground hover:bg-accent/0 hover:text-foreground"
                            }`}
                        >
                            {section.label}
                        </button>
                    ))}
                </div>

                <div className="flex-1 px-4">
                    {activeSection === "profile" && <ProfileSection/>}
                    {activeSection === "test" && (
                        <div>
                            Test
                        </div>
                    )}
                </div>
            </div>

            <DialogFooter className="flex items-center justify-between w-full">
                <span className="text-xs text-muted-foreground">
                    Changes are saved automatically
                </span>
            </DialogFooter>
        </Dialog>
    );
}