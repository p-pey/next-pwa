"use client";

import React, { useState } from "react";
import { MapPin, Clock, Navigation } from "lucide-react";
import { AppProvider } from "@/context/AppContext";
import { FlightInfo } from "@/types";

import AnimatedCloudBackground from "@/components/AnimatedCloudBackground";
import StatusBar from "@/components/StatusBar";
import FlightInfoCard from "@/components/FlightInfoCard";
import FloatingAssistantButton from "@/components/FloatingAssistantButton";
import AssistantMenu from "@/components/AssistantMenu";
import ChatbotModal from "@/components/ChatbotModal";
import ServiceRequestsModal from "@/components/ServiceRequestsModal";
import PilotAnnouncementModal from "@/components/PilotAnnouncementModal";
import DemoControls from "@/components/DemoControls";

const flightInfo: FlightInfo = {
    origin: { code: "LAX", city: "Los Angeles", country: "United States" },
    destination: { code: "NRT", city: "Tokyo Narita", country: "Japan" },
    departureTime: "10:30 AM",
    arrivalTime: "3:45 PM +1",
    flightNumber: "TH 881",
    aircraft: "Boeing 787-9",
    altitude: 35000,
    speed: 575,
    remainingTime: 245,
    progress: 62,
    currentPosition: { lat: 45.5, lng: -170.2 },
};

function MainApp() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeModal, setActiveModal] = useState<string | null>(null);

    const handleSelectOption = (option: string) => {
        setIsMenuOpen(false);
        setTimeout(() => setActiveModal(option), 300);
    };

    return (
        <div className="min-h-screen bg-gray-50 relative overflow-hidden">
            {/* Animated Background */}
            <AnimatedCloudBackground />

            {/* Status Bar */}
            <StatusBar />

            {/* Main Content */}
            <main className="relative z-10 p-4 pb-32">
                {/* Welcome Header */}
                <div className="mb-6 animate-fade-in">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Welcome Aboard ✈️
                    </h1>
                    <p className="text-gray-600">Enjoy your flight to Tokyo</p>
                </div>

                {/* Flight Info Card */}
                <div className="animate-slide-up">
                    <FlightInfoCard flightInfo={flightInfo} />
                </div>

                {/* Quick Info Cards */}
                <div
                    className="grid grid-cols-3 gap-3 mt-6 animate-slide-up"
                    style={{ animationDelay: "200ms" }}
                >
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
                        <MapPin className="w-5 h-5 text-blue-500 mb-2" />
                        <p className="text-xs text-gray-500">Current Location</p>
                        <p className="text-sm font-semibold text-gray-800">Pacific Ocean</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
                        <Clock className="w-5 h-5 text-green-500 mb-2" />
                        <p className="text-xs text-gray-500">Local Time</p>
                        <p className="text-sm font-semibold text-gray-800">2:45 AM</p>
                    </div>
                    <div className="bg-white/80 backdrop-blur-xl rounded-2xl p-4 shadow-lg border border-white/50">
                        <Navigation className="w-5 h-5 text-purple-500 mb-2" />
                        <p className="text-xs text-gray-500">Distance Left</p>
                        <p className="text-sm font-semibold text-gray-800">2,450 mi</p>
                    </div>
                </div>
            </main>

            {/* Floating Assistant Button */}
            <FloatingAssistantButton
                onOpenMenu={() => setIsMenuOpen(!isMenuOpen)}
                isMenuOpen={isMenuOpen}
            />

            {/* Assistant Menu */}
            <AssistantMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                onSelectOption={handleSelectOption}
            />

            {/* Modals */}
            <ChatbotModal
                isOpen={activeModal === "chatbot"}
                onClose={() => setActiveModal(null)}
            />
            <ServiceRequestsModal
                isOpen={activeModal === "requests"}
                onClose={() => setActiveModal(null)}
            />

            {/* Pilot Announcement Modal */}
            <PilotAnnouncementModal />

            {/* Demo Controls */}
            <DemoControls />
        </div>
    );
}

export default function ThalesIFEApp() {
    return (
        <AppProvider>
            <MainApp />
        </AppProvider>
    );
}