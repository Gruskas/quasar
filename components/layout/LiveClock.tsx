"use client"

import {useEffect, useState} from "react";

export function LiveClock() {
    const [time, setTime] = useState<string>("")

    useEffect(() => {
        const updateTime = () => {
            setTime(
                new Date().toLocaleTimeString(undefined, {
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "numeric",
                    hour12: false
                })
            )
        }
        updateTime();
        const timer = setInterval(updateTime, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <span>{time}</span>
    )
}