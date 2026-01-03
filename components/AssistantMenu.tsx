"use client";

import React from "react";
import {
    MessageCircle,
    Bell,
    Headphones,
    Moon,
    Wifi,
} from "lucide-react";
import { MenuItemType } from "@/types";

interface AssistantMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectOption: (option: string) => void;
}

const menuItems: MenuItemType[] = [
    {
        id: "chatbot",
        icon: MessageCircle,
        label: "Travel Guide",
        description: "Hotels, restaurants & more",
        color: "from-purple-500 to-pink-500",
    },
    {
        id: "requests",
        icon: Bell,
        label: "Crew Requests",
        description: "Food, drinks & services",
        color: "from-orange-500 to-red-500",
    },
    {
        id: "entertainment",
        icon: Headphones,
        label: "Entertainment",
        description: "Movies, music & games",
        color: "from-green-500 to-teal-500",
    },
    {
        id: "sleep",
        icon: Moon,
        label: "Sleep Mode",
        description: "Do not disturb settings",
        color: "from-indigo-500 to-purple-500",
    },
    {
        id: "wifi",
        icon: Wifi,
        label: "Connectivity",
        description: "WiFi & messaging",
        color: "from-cyan-500 to-blue-500",
    },
];

const AssistantMenu: React.FC<AssistantMenuProps> = ({
    isOpen,
    onClose,
    onSelectOption,
}) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-40 bg-black/20 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Menu Container */}
            <div
                className={`fixed inset-0 z-40 flex items-center justify-center p-6 pointer-events-none ${isOpen ? "" : "hidden"
                    }`}
            >
                <div className="relative grid grid-cols-2 gap-4 pointer-events-auto max-w-sm">
                    {menuItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`transform transition-all duration-500 ${isOpen
                                    ? "opacity-100 translate-y-0 scale-100"
                                    : "opacity-0 translate-y-8 scale-90"
                                }`}
                            style={{
                                transitionDelay: isOpen
                                    ? `${index * 80}ms`
                                    : `${(4 - index) * 50}ms`,
                            }}
                        >
                            <button
                                onClick={() => onSelectOption(item.id)}
                                className={`w-full p-4 rounded-2xl bg-gradient-to-br ${item.color} shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200`}
                            >
                                <div className="flex flex-col items-center text-white">
                                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <p className="font-semibold text-sm">{item.label}</p>
                                    <p className="text-xs text-white/80 mt-1">
                                        {item.description}
                                    </p>
                                </div>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AssistantMenu;