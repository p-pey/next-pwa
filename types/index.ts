import { ReactNode } from "react";

export interface FlightInfo {
    origin: { code: string; city: string; country: string };
    destination: { code: string; city: string; country: string };
    departureTime: string;
    arrivalTime: string;
    flightNumber: string;
    aircraft: string;
    altitude: number;
    speed: number;
    remainingTime: number;
    progress: number;
    currentPosition: { lat: number; lng: number };
}

export interface Message {
    id: string;
    text: string;
    sender: "user" | "bot";
    timestamp: Date;
}

export interface ServiceRequest {
    id: string;
    type: string;
    status: "pending" | "accepted" | "completed";
    timestamp: Date;
    icon: ReactNode;
}

export interface PilotAnnouncement {
    id: string;
    message: string;
    priority: "normal" | "high";
    timestamp: Date;
}

export interface AppContextType {
    notifications: number;
    addNotification: () => void;
    clearNotifications: () => void;
    pilotAnnouncement: PilotAnnouncement | null;
    triggerPilotAnnouncement: (message: string) => void;
    dismissPilotAnnouncement: () => void;
    serviceRequests: ServiceRequest[];
    addServiceRequest: (type: string, icon: ReactNode) => void;
    updateServiceRequest: (id: string, status: ServiceRequest["status"]) => void;
}

export interface MenuItemType {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    description: string;
    color: string;
}

export interface ServiceItemType {
    id: string;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    description: string;
    color: string;
}