"use client"

import {Input} from "@/components/ui/input";
import React, {useEffect, useState} from "react";
import {getConnectionSettings, updateConnectionSettings} from "@/lib/settings";

export function ConnectionSection() {
    const [sshPort, setSshPort] = useState("22")
    const [timeout, setTimeout] = useState("10")
    const [rdpPort, setRdpPort] = useState("3389")
    const [rdpClient, setRdpClient] = useState("bat")

    useEffect(() => {
        let isMounted = true

        async function loadSettings() {
            try {
                const settings = await getConnectionSettings()
                if (isMounted && settings) {
                    if (settings.defaultSshPort) setSshPort(String(settings.defaultSshPort))
                    if (settings.connectionTimeout) setTimeout(String(settings.connectionTimeout))
                    if (settings.defaultRdpPort) setRdpPort(String(settings.defaultRdpPort))
                    if (settings.defaultRdpClient) setRdpClient(settings.defaultRdpClient)
                }
            } catch (error) {
                console.error("Failed to fetch connection settings:", error);
            }
        }

        loadSettings();

        return () => {
            isMounted = false
        }
    }, [])

    const handleChange = (key: string, value: string, setter: (value: string) => void) => {
        setter(value)
        const formData = new FormData()
        formData.set(key, value)
        updateConnectionSettings(formData)
    }

    return (
        <>
            <div className="text-base font-semibold pb-2">
                Connections
            </div>

            <div className="border-b pl-2">
                <div className="flex items-center justify-between py-3">
                    <div>
                        <div className="text-sm font-medium">
                            Default SSH Port
                        </div>
                    </div>

                    <Input
                        type="number"
                        min={1}
                        max={65535}
                        value={sshPort}
                        onChange={(e) => handleChange("defaultSshPort", e.target.value, setSshPort)}
                        className="h-8 w-20 text-center"
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-t">
                    <div>
                        <div className="text-sm font-medium">
                            Connection Timeout
                        </div>
                        <div className="text-xs text-muted-foreground">
                            In seconds
                        </div>
                    </div>

                    <Input
                        type="number"
                        min={1}
                        value={timeout}
                        onChange={(e) => handleChange("connectionTimeout", e.target.value, setTimeout)}
                        className="h-8 w-20 text-center"
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-t">
                    <div>
                        <div className="text-sm font-medium">
                            Default RDP Port
                        </div>
                    </div>

                    <Input
                        type="number"
                        min={1}
                        max={65535}
                        value={rdpPort}
                        onChange={(e) => handleChange("defaultRdpPort", e.target.value, setRdpPort)}
                        className="h-8 w-20 text-center"
                    />
                </div>

                <div className="flex items-center justify-between py-3 border-t">
                    <div>
                        <div className="text-sm font-medium">
                            Default RDP Client
                        </div>
                    </div>

                    <select
                        value={rdpClient}
                        onChange={(e) => handleChange("defaultRdpClient", e.target.value, setRdpClient)}
                        className="h-8 rounded-md border border-input bg-background px-2 text-sm"
                    >
                        <option value="URI">URI</option>
                        <option value="bat">.BAT Script</option>
                    </select>
                </div>
            </div>
        </>
    )
}