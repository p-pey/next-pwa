"use client";

import React, { useState, useEffect } from "react";
import { Volume2 } from "lucide-react";
import { useApp } from "@/context/AppContext";

const PilotAnnouncementModal: React.FC = () => {
    const { pilotAnnouncement, dismissPilotAnnouncement } = useApp();
    const [canClose, setCanClose] = useState(false);
    const [countdown, setCountdown] = useState(10);

    useEffect(() => {
        if (pilotAnnouncement) {
            setCanClose(false);
            setCountdown(10);

            const interval = setInterval(() => {
                setCountdown((prev) => {
                    if (prev <= 1) {
                        setCanClose(true);
                        clearInterval(interval);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [pilotAnnouncement]);

    if (!pilotAnnouncement) return null;

    return (
        <>
            {/* Full Screen Blur Backdrop */}
            <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-lg animate-fade-in" />

            {/* Modal */}
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 animate-scale-in">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-amber-500 to-orange-500 px-6 py-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center animate-pulse">
                                <Volume2 className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <p className="text-white/80 text-sm">Captain Speaking</p>
                                <p className="text-white font-bold text-lg">
                                    Pilot Announcement
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        <div className="flex gap-3 mb-6">
                            <div className="w-1 bg-gradient-to-b from-amber-500 to-orange-500 rounded-full" />
                            <p className="text-gray-700 text-lg leading-relaxed">
                                {pilotAnnouncement.message}
                            </p>
                        </div>

                        {/* Sound Wave Animation */}
                        <div className="flex items-center justify-center gap-1 py-4">
                            {[...Array(7)].map((_, i) => (
                                <div
                                    key={i}
                                    className="w-1 bg-gradient-to-t from-amber-500 to-orange-400 rounded-full animate-soundwave"
                                    style={{
                                        animationDelay: `${i * 100}ms`,
                                        height: `${20 + Math.random() * 30}px`,
                                    }}
                                />
                            ))}
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => canClose && dismissPilotAnnouncement()}
                            disabled={!canClose}
                            className={`w-full py-4 rounded-2xl font-semibold transition-all duration-300 ${canClose
                                    ? "bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg hover:scale-[1.02]"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                }`}
                        >
                            {canClose ? "Dismiss" : `Please wait ${countdown}s...`}
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PilotAnnouncementModal;