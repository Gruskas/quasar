"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";

export function ProfileSection() {
    return (
        <>
            <div className="text-base font-semibold">Profile</div>

            <div className="flex items-center gap-3 py-4 border-b">
                <div
                    className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-lg font-semibold">
                    TEST
                </div>
                <div>
                    <div className="font-medium">TEST</div>
                    <div className="text-xs text-muted-foreground">example@example.com</div>
                </div>
                <Button variant="ghost" className="ml-auto">
                    Change avatar
                </Button>
            </div>

            <div className="border-b pb-3">
                <div className="py-3">
                    <div className="text-xs text-muted-foreground pb-1">Display name</div>
                    <Input defaultValue="TEST" className="h-9"/>
                </div>
                <div className="py-2">
                    <div className="text-xs text-muted-foreground pb-1">Email address</div>
                    <Input placeholder="example@example.com" className="h-9" disabled/>
                </div>
            </div>

            <div className="flex items-center justify-between py-3.5 px-1">
                <div>
                    <div className="text-sm font-medium">Password</div>
                    <div className="text-xs text-muted-foreground">Last changed 3 months ago</div>
                </div>
                <Button variant="ghost">Change password</Button>
            </div>
        </>
    );
}