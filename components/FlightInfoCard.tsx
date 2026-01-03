"use client";

import React from "react";
import { Plane, Clock, Navigation } from "lucide-react";
import { FlightInfo } from "@/types";
import FlightMapVisualization from "./FlightMapVisualization";

interface FlightInfoCardProps {
    flightInfo: FlightInfo;
}

const FlightInfoCard: React.FC<FlightInfoCardProps> = ({ flightInfo }) => {
    const formatTime = (minutes: number): string => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    return (
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-xl border border-white/50 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                            <Plane className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-white/80 text-sm">Flight</p>
                            <p className="text-white font-bold text-lg">
                                {flightInfo.flightNumber}
                            </p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p className="text-white/80 text-sm">Aircraft</p>
                        <p className="text-white font-semibold">{flightInfo.aircraft}</p>
                    </div>
                </div>
            </div>

            {/* Route Info */}
            <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                    {/* Origin */}
                    <div className="text-center">
                        <p className="text-4xl font-bold text-gray-800">
                            {flightInfo.origin.code}
                        </p>
                        <p className="text-sm text-gray-600">{flightInfo.origin.city}</p>
                        <p className="text-xs text-gray-400">{flightInfo.origin.country}</p>
                        <p className="text-lg font-semibold text-blue-600 mt-2">
                            {flightInfo.departureTime}
                        </p>
                    </div>

                    {/* Flight Duration */}
                    <div className="flex-1 px-6">
                        <div className="flex items-center justify-center gap-2 mb-2">
                            <Clock className="w-4 h-4 text-gray-400" />
                            <span className="text-sm text-gray-500">
                                {formatTime(flightInfo.remainingTime)} remaining
                            </span>
                        </div>
                        <div className="relative h-1 bg-gray-200 rounded-full overflow-hidden">
                            <div
                                className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-1000"
                                style={{ width: `${flightInfo.progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-1">
                            <Navigation className="w-4 h-4 text-blue-500" />
                            <Navigation className="w-4 h-4 text-gray-300" />
                        </div>
                    </div>

                    {/* Destination */}
                    <div className="text-center">
                        <p className="text-4xl font-bold text-gray-800">
                            {flightInfo.destination.code}
                        </p>
                        <p className="text-sm text-gray-600">
                            {flightInfo.destination.city}
                        </p>
                        <p className="text-xs text-gray-400">
                            {flightInfo.destination.country}
                        </p>
                        <p className="text-lg font-semibold text-green-600 mt-2">
                            {flightInfo.arrivalTime}
                        </p>
                    </div>
                </div>

                {/* Map Visualization */}
                <FlightMapVisualization flightInfo={flightInfo} />
            </div>
        </div>
    );
};

export default FlightInfoCard;