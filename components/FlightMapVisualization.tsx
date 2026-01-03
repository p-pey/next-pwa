"use client";

import React from "react";
import { Plane } from "lucide-react";
import { FlightInfo } from "@/types";

interface FlightMapVisualizationProps {
    flightInfo: FlightInfo;
}

const FlightMapVisualization: React.FC<FlightMapVisualizationProps> = ({
    flightInfo,
}) => {
    return (
        <div className="relative w-full h-48 bg-gradient-to-r from-sky-50 to-blue-50 rounded-2xl overflow-hidden border border-sky-100">
            {/* Flight Path */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 120">
                {/* Path Line */}
                <path
                    d="M 40 80 Q 200 20 360 80"
                    stroke="url(#pathGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray="8,4"
                    className="dash-animation"
                />

                {/* Completed Path */}
                <path
                    d="M 40 80 Q 200 20 360 80"
                    stroke="url(#completedGradient)"
                    strokeWidth="3"
                    fill="none"
                    strokeDasharray={`${flightInfo.progress * 4}, 400`}
                    className="transition-all duration-1000"
                />

                {/* Gradients */}
                <defs>
                    <linearGradient id="pathGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#93c5fd" />
                        <stop offset="100%" stopColor="#60a5fa" />
                    </linearGradient>
                    <linearGradient
                        id="completedGradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                    >
                        <stop offset="0%" stopColor="#3b82f6" />
                        <stop offset="100%" stopColor="#1d4ed8" />
                    </linearGradient>
                </defs>

                {/* Origin Airport */}
                <circle cx="40" cy="80" r="8" fill="#3b82f6" className="animate-pulse" />
                <text
                    x="40"
                    y="105"
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-700"
                >
                    {flightInfo.origin.code}
                </text>

                {/* Destination Airport */}
                <circle
                    cx="360"
                    cy="80"
                    r="8"
                    fill="#10b981"
                    className="animate-pulse"
                />
                <text
                    x="360"
                    y="105"
                    textAnchor="middle"
                    className="text-xs font-bold fill-gray-700"
                >
                    {flightInfo.destination.code}
                </text>

                {/* Airplane Icon Position */}
                <g
                    transform={`translate(${40 + flightInfo.progress * 3.2}, ${80 - Math.sin((flightInfo.progress / 100) * Math.PI) * 50
                        })`}
                >
                    <circle r="16" fill="white" className="drop-shadow-lg" />
                    <foreignObject x="-8" y="-8" width="16" height="16">
                        <Plane className="w-4 h-4 text-blue-600" />
                    </foreignObject>
                </g>
            </svg>

            {/* Flight Stats Overlay */}
            <div className="absolute bottom-3 left-3 right-3 flex justify-between">
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                    <p className="text-xs text-gray-500">Altitude</p>
                    <p className="text-sm font-semibold text-gray-800">
                        {flightInfo.altitude.toLocaleString()} ft
                    </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                    <p className="text-xs text-gray-500">Speed</p>
                    <p className="text-sm font-semibold text-gray-800">
                        {flightInfo.speed} mph
                    </p>
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm">
                    <p className="text-xs text-gray-500">Progress</p>
                    <p className="text-sm font-semibold text-gray-800">
                        {Math.round(flightInfo.progress)}%
                    </p>
                </div>
            </div>
        </div>
    );
};

export default FlightMapVisualization;