import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function formatRelativeTime(targetDate?: Date | null): string {
    if (!targetDate) return "never";

    const past = new Date(targetDate);
    const now = new Date();
    const secondsAgo = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (secondsAgo < 60) {
        return "Just now";
    }

    const minutesAgo = Math.floor(secondsAgo / 60);
    if (minutesAgo < 60) {
        return `${minutesAgo}m ago`;
    }

    const hoursAgo = Math.floor(minutesAgo / 60);
    if (hoursAgo < 24) {
        return `${hoursAgo}h ago`;
    }

    const daysAgo = Math.floor(hoursAgo / 24);
    if (daysAgo < 30) {
        return `${daysAgo}d ago`;
    }

    const monthsAgo = Math.floor(daysAgo / 30);
    if (monthsAgo < 12) {
        return `${monthsAgo} ${monthsAgo === 1 ? "month" : "months"} ago`;
    }

    const yearsAgo = Math.floor(daysAgo / 365);
    return `${yearsAgo} ${yearsAgo === 1 ? "year" : "years"} ago`;
}