"use client";

import React from "react";
import { Volume2, Bell } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { sendNotification } from "@/utils/pwa";

const pilotMessages = [
    "Good afternoon ladies and gentlemen, this is your captain speaking. We are currently cruising at 35,000 feet and expect a smooth flight ahead. The weather at our destination is sunny with temperatures around 22°C. Enjoy your flight!",
    "Attention passengers, we will be experiencing some mild turbulence in the next 15 minutes. Please return to your seats and fasten your seatbelts. Thank you for your cooperation.",
    "Ladies and gentlemen, we have begun our descent into Tokyo Narita International Airport. Please ensure your seatbelts are fastened and your seat is in the upright position.",
];

const DemoControls: React.FC = () => {
    const { triggerPilotAnnouncement, addNotification } = useApp();

    const handlePilotAnnouncement = () => {
        const message =
            pilotMessages[Math.floor(Math.random() * pilotMessages.length)];
        triggerPilotAnnouncement(message);
    };

    const handleAddNotification = async () => {
        console.log("🔘 Add Notification button clicked");
        setTimeout(async () => {
            console.log("⏰ Timeout fired, adding notification...");
            addNotification();
            await sendNotification("New Update", "You have a new notification!");
            if (navigator.serviceWorker.controller) {
                navigator.serviceWorker.controller.postMessage({
                    action: "OPEN_WINDOW",
                    url: "/messages/123"
                });
            }

        }, 5000);
    };

    return (
        <div className="fixed bottom-4 left-4 right-4 z-30">
            <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-lg border border-white/50 p-4">
                <p className="text-xs font-semibold text-gray-500 mb-3">
                    DEMO CONTROLS
                </p>
                <div className="flex gap-2 flex-wrap">
                    <button
                        onClick={handlePilotAnnouncement}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                        <Volume2 className="w-4 h-4 inline mr-2" />
                        Pilot Announcement
                    </button>
                    <button
                        onClick={handleAddNotification}
                        className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all hover:scale-[1.02]"
                    >
                        <Bell className="w-4 h-4 inline mr-2" />
                        Add Notification
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DemoControls;