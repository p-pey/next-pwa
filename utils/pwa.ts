export const requestNotificationPermission = async (): Promise<boolean> => {
    if ("Notification" in window) {
        const permission = await Notification.requestPermission();
        return permission === "granted";
    }
    return false;
};

export const sendNotification = async (
    title: string,
    body: string,
    icon?: string,
    url?: string
): Promise<void> => {
    console.log("🔔 sendNotification called:", { title, body, permission: Notification.permission });

    if (!("Notification" in window)) {
        console.error("❌ Notifications not supported");
        return;
    }

    if (Notification.permission !== "granted") {
        console.warn("⚠️ Notification permission not granted. Current status:", Notification.permission);
        const permission = await Notification.requestPermission();
        console.log("📱 Permission request result:", permission);
        if (permission !== "granted") {
            return;
        }
    }

    // Use service worker notification for better reliability
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        try {
            const registration = await navigator.serviceWorker.ready;

            await registration.showNotification(title, {
                body,
                icon: icon || "/icon-192.png",
                badge: "/badge-72.png",
                tag: "ife-notification",
                requireInteraction: true,
                data: {
                    url: url || "/",
                    dateOfArrival: Date.now(),
                },
                actions: [
                    { action: "open", title: "Open" },
                    { action: "close", title: "Dismiss" },
                ],
            } as NotificationOptions);
            console.log("✅ Service Worker notification sent successfully");
        } catch (error) {
            console.error("❌ Service Worker notification failed:", error);
            // Fallback to regular notification
            new Notification(title, {
                body,
                icon: icon || "/icon-192.png",
                badge: "/badge-72.png",
                tag: "ife-notification",
                requireInteraction: true,
            });
            console.log("✅ Fallback notification sent");
        }
    } else {
        // No service worker, use regular notification
        new Notification(title, {
            body,
            icon: icon || "/icon-192.png",
            badge: "/badge-72.png",
            tag: "ife-notification",
            requireInteraction: true,
        });
        console.log("✅ Regular notification sent (no SW)");
    }
};

export const updateBadge = async (count: number): Promise<void> => {
    if ("setAppBadge" in navigator) {
        try {
            if (count > 0) {
                await (navigator as unknown as { setAppBadge: (count: number) => Promise<void> }).setAppBadge(count);
            } else {
                await (navigator as unknown as { clearAppBadge: () => Promise<void> }).clearAppBadge();
            }
        } catch (error) {
            console.log("Badge API not supported", error);
        }
    }
};

export const registerServiceWorker = async (): Promise<void> => {
    if ("serviceWorker" in navigator) {
        try {
            const registration = await navigator.serviceWorker.register("/sw.js");
            console.log("Service Worker registered:", registration);
        } catch (error) {
            console.log("Service Worker registration failed:", error);
        }
    }
};

export const checkVisibilityAndNotify = (
    title: string,
    body: string
): void => {
    if (document.hidden) {
        sendNotification(title, body);
    }
};

/**
 * Sends a message to the service worker to open or focus a window
 * @param url - The URL to open/navigate to
 */
export const openWindowViaServiceWorker = async (url: string = "/"): Promise<void> => {
    if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
        console.log("📤 Sending OPEN_WINDOW message to service worker:", url);
        navigator.serviceWorker.controller.postMessage({
            action: "OPEN_WINDOW",
            url: url,
        });
    } else {
        console.warn("⚠️ Service worker not available, opening window directly");
        window.open(url, "_blank");
    }
};
