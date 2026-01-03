"use client";

import React, {
    createContext,
    useContext,
    useState,
    useCallback,
    useEffect,
    ReactNode,
} from "react";
import { AppContextType, PilotAnnouncement, ServiceRequest } from "@/types";
import {
    requestNotificationPermission,
    sendNotification,
    updateBadge,
    registerServiceWorker,
} from "@/utils/pwa";

const AppContext = createContext<AppContextType | null>(null);

export const useApp = (): AppContextType => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error("useApp must be used within AppProvider");
    }
    return context;
};

interface AppProviderProps {
    children: ReactNode;
}

export const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const [notifications, setNotifications] = useState(0);
    const [pilotAnnouncement, setPilotAnnouncement] =
        useState<PilotAnnouncement | null>(null);
    const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);

    const addNotification = useCallback(() => {
        setNotifications((prev) => {
            const newCount = prev + 1;
            updateBadge(newCount);
            return newCount;
        });
    }, []);

    const clearNotifications = useCallback(() => {
        setNotifications(0);
        updateBadge(0);
    }, []);

    const triggerPilotAnnouncement = useCallback(
        (message: string) => {
            const announcement: PilotAnnouncement = {
                id: Date.now().toString(),
                message,
                priority: "high",
                timestamp: new Date(),
            };
            setPilotAnnouncement(announcement);
            addNotification();

            if (document.hidden) {
                sendNotification(
                    "🎙️ Captain Speaking",
                    "Important announcement from the flight deck"
                );
            }
        },
        [addNotification]
    );

    const dismissPilotAnnouncement = useCallback(() => {
        setPilotAnnouncement(null);
    }, []);

    const addServiceRequest = useCallback(
        (type: string, icon: ReactNode) => {
            const request: ServiceRequest = {
                id: Date.now().toString(),
                type,
                status: "pending",
                timestamp: new Date(),
                icon,
            };
            setServiceRequests((prev) => [...prev, request]);
            sendNotification(
                "Request Sent",
                `Your ${type} request has been sent to the cabin crew.`
            );
        },
        []
    );

    const updateServiceRequest = useCallback(
        (id: string, status: ServiceRequest["status"]) => {
            setServiceRequests((prev) =>
                prev.map((req) => (req.id === id ? { ...req, status } : req))
            );
        },
        []
    );

    useEffect(() => {
        // Initialize PWA features
        console.log("🚀 Initializing PWA features...");
        registerServiceWorker();
        requestNotificationPermission().then(granted => {
            console.log("📱 Notification permission:", granted ? "✅ Granted" : "❌ Denied");
        });

        // Listen for messages from service worker
        const handleServiceWorkerMessage = (event: MessageEvent) => {
            console.log("📬 Received message from service worker:", event.data);

            if (event.data.type === 'NAVIGATE' && event.data.url) {
                console.log("🧭 Navigating to:", event.data.url);
                window.location.href = event.data.url;
            }

            if (event.data.type === 'NOTIFICATION_CLICKED' && event.data.url) {
                console.log("🔔 Notification clicked, navigating to:", event.data.url);
                window.location.href = event.data.url;
            }
        };

        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.addEventListener('message', handleServiceWorkerMessage);
        }

        return () => {
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.removeEventListener('message', handleServiceWorkerMessage);
            }
        };
    }, []);

    useEffect(() => {
        const handlePilotEvent = (e: CustomEvent<{ message: string }>) => {
            triggerPilotAnnouncement(e.detail.message);
        };

        window.addEventListener(
            "pilotAnnouncement",
            handlePilotEvent as EventListener
        );
        return () => {
            window.removeEventListener(
                "pilotAnnouncement",
                handlePilotEvent as EventListener
            );
        };
    }, [triggerPilotAnnouncement]);

    const value: AppContextType = {
        notifications,
        addNotification,
        clearNotifications,
        pilotAnnouncement,
        triggerPilotAnnouncement,
        dismissPilotAnnouncement,
        serviceRequests,
        addServiceRequest,
        updateServiceRequest,
    };

    return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContext;