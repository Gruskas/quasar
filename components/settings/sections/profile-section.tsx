"use client"

import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {useUser} from "@/components/providers/user-provider";
import {updateUsername, uploadAvatar} from "@/lib/actions";
import {useState} from "react";

export function ProfileSection() {
    const user = useUser()
    const [isChangingPassword, setIsChangingPassword] = useState(false);

    return (
        <>
            <div className="text-base font-semibold">Profile</div>

            <div className="flex items-center gap-3 py-4 border-b">
                <div
                    className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center text-lg font-semibold shrink-0 overflow-hidden">
                    {user?.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.username}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        user?.username ? user.username.slice(0, 2).toUpperCase() : null
                    )}
                </div>
                <div>
                    <div className="font-medium">{user?.username}</div>
                    <div className="text-xs text-muted-foreground">{user?.email}</div>
                </div>
                <label className="ml-auto cursor-pointer">
                    <Input
                        type="file"
                        accept="image/*"
                        onChange={async (e) => {
                            const file = e.target.files?.[0];
                            if (!file) return;

                            const data = new FormData();
                            data.append("avatar", file);

                            await uploadAvatar(data);
                        }}
                        className="hidden"/>
                    <span>Change avatar</span>
                </label>
            </div>

            <div className="border-b pb-3">
                <div className="py-3">
                    <div className="text-xs text-muted-foreground pb-1">Display name</div>
                    <Input
                        defaultValue={user?.username}
                        onChange={(e) => updateUsername(e.target.value)}
                        className="h-9"/>
                </div>
                <div className="py-2">
                    <div className="text-xs text-muted-foreground pb-1">Email address</div>
                    <Input placeholder="example@example.com" className="h-9" disabled/>
                </div>
            </div>

            {isChangingPassword ? (
                <form className="mt-3 space-y-3">
                    <div>
                        <div className="text-xs text-muted-foreground pb-1">Current password</div>
                        <Input
                            type="password"
                            className="h-8"
                            required
                        />
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground pb-1">New password</div>
                        <Input
                            type="password"
                            className="h-8"
                            required
                        />
                    </div>

                    <div>
                        <div className="text-xs text-muted-foreground pb-1">Confirm new password</div>
                        <Input
                            type="password"
                            className="h-8"
                            required
                        />
                    </div>

                    <div className="flex items-center justify-end gap-2 pt-2">
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                                setIsChangingPassword(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button type="submit" size="sm">
                            Update password
                        </Button>
                    </div>
                </form>
            ) : (
                <div className="flex items-center justify-between py-3.5 px-1">
                    <div>
                        <div className="text-sm font-medium">Password</div>
                        <div className="text-xs text-muted-foreground">Last changed 3 months ago</div>
                    </div>
                    <Button
                        variant="ghost"
                        onClick={() => setIsChangingPassword(true)}
                    >Change password
                    </Button>
                </div>
            )
            }
        </>
    )
}