"use client";

import React from "react";
import { Coffee, UtensilsCrossed, Moon, Check } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { sendNotification } from "@/utils/pwa";
import { ServiceItemType } from "@/types";
import ModalWrapper from "./ModalWrapper";

interface ServiceRequestsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const services: ServiceItemType[] = [
    {
        id: "water",
        icon: Coffee,
        label: "Water",
        description: "Still or sparkling",
        color: "from-cyan-400 to-blue-500",
    },
    {
        id: "coffee",
        icon: Coffee,
        label: "Coffee/Tea",
        description: "Hot beverages",
        color: "from-amber-400 to-orange-500",
    },
    {
        id: "meal",
        icon: UtensilsCrossed,
        label: "Meal",
        description: "Request a meal",
        color: "from-green-400 to-emerald-500",
    },
    {
        id: "snack",
        icon: UtensilsCrossed,
        label: "Snacks",
        description: "Light refreshments",
        color: "from-pink-400 to-rose-500",
    },
    {
        id: "blanket",
        icon: Moon,
        label: "Blanket/Pillow",
        description: "Comfort items",
        color: "from-purple-400 to-indigo-500",
    },
    {
        id: "no-wake",
        icon: Moon,
        label: "Do Not Disturb",
        description: "Skip breakfast service",
        color: "from-slate-400 to-gray-600",
    },
];

const ServiceRequestsModal: React.FC<ServiceRequestsModalProps> = ({
    isOpen,
    onClose,
}) => {
    const { serviceRequests, addServiceRequest, updateServiceRequest } = useApp();

    const handleRequest = (service: ServiceItemType) => {
        addServiceRequest(service.label, <service.icon className="w-5 h-5" />);

        // Simulate acceptance after 3-5 seconds
        setTimeout(() => {
            const latestId = Date.now().toString();
            updateServiceRequest(latestId, "accepted");
            sendNotification(
                "Request Accepted ✓",
                `Your ${service.label} request has been accepted by the cabin crew.`
            );
        }, 3000 + Math.random() * 2000);
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Crew Requests">
            <div className="p-4 space-y-6">
                {/* Service Options */}
                <div>
                    <h3 className="text-sm font-semibold text-gray-500 mb-3">
                        AVAILABLE SERVICES
                    </h3>
                    <div className="grid grid-cols-2 gap-3">
                        {services.map((service, index) => (
                            <button
                                key={service.id}
                                onClick={() => handleRequest(service)}
                                className={`p-4 rounded-2xl bg-gradient-to-br ${service.color} text-white transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-xl animate-fade-in-up`}
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-2">
                                    <service.icon className="w-5 h-5" />
                                </div>
                                <p className="font-semibold text-sm">{service.label}</p>
                                <p className="text-xs text-white/80">{service.description}</p>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Active Requests */}
                {serviceRequests.length > 0 && (
                    <div>
                        <h3 className="text-sm font-semibold text-gray-500 mb-3">
                            YOUR REQUESTS
                        </h3>
                        <div className="space-y-2">
                            {serviceRequests.map((request, index) => (
                                <div
                                    key={request.id}
                                    className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl animate-fade-in-up"
                                    style={{ animationDelay: `${index * 50}ms` }}
                                >
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center ${request.status === "pending"
                                                ? "bg-yellow-100 text-yellow-600"
                                                : request.status === "accepted"
                                                    ? "bg-green-100 text-green-600"
                                                    : "bg-blue-100 text-blue-600"
                                            }`}
                                    >
                                        {request.status === "accepted" ? (
                                            <Check className="w-5 h-5" />
                                        ) : (
                                            request.icon
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <p className="font-medium text-gray-800">{request.type}</p>
                                        <p className="text-xs text-gray-500">
                                            {request.timestamp.toLocaleTimeString()}
                                        </p>
                                    </div>
                                    <span
                                        className={`px-3 py-1 rounded-full text-xs font-medium ${request.status === "pending"
                                                ? "bg-yellow-100 text-yellow-700"
                                                : request.status === "accepted"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-blue-100 text-blue-700"
                                            }`}
                                    >
                                        {request.status.charAt(0).toUpperCase() +
                                            request.status.slice(1)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </ModalWrapper>
    );
};

export default ServiceRequestsModal;