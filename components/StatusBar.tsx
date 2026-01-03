"use client";

import React, { useState, useEffect } from "react";
import { Signal, Wifi, Battery } from "lucide-react";

const StatusBar: React.FC = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const interval = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center justify-between px-4 py-2 bg-white/50 backdrop-blur-lg border-b border-white/30">
            <span className="text-sm font-medium text-gray-700">
                {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </span>
            <span className="text-sm font-semibold text-blue-600">Thales IFE</span>
            <div className="flex items-center gap-2">
                <Signal className="w-4 h-4 text-gray-600" />
                <Wifi className="w-4 h-4 text-gray-600" />
                <Battery className="w-4 h-4 text-gray-600" />
            </div>
        </div>
    );
};

export default StatusBar;