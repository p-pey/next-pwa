"use client";

import React from "react";
import { Cloud } from "lucide-react";

const AnimatedCloudBackground: React.FC = () => {
    return (
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
            {/* Gradient Sky */}
            <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-sky-100 to-white" />

            {/* Sun Glow */}
            <div className="absolute top-20 right-20 w-40 h-40 bg-yellow-200 rounded-full blur-3xl opacity-60 animate-pulse" />

            {/* Animated Clouds */}
            {[...Array(8)].map((_, i) => (
                <div
                    key={i}
                    className="absolute cloud-animation"
                    style={{
                        top: `${10 + Math.random() * 60}%`,
                        left: `-20%`,
                        animationDuration: `${40 + Math.random() * 30}s`,
                        animationDelay: `${-Math.random() * 40}s`,
                        opacity: 0.4 + Math.random() * 0.4,
                        transform: `scale(${0.5 + Math.random() * 1})`,
                    }}
                >
                    <Cloud
                        className="text-white drop-shadow-lg"
                        size={80 + Math.random() * 60}
                        fill="white"
                    />
                </div>
            ))}

            {/* Sparkle Effects */}
            {[...Array(20)].map((_, i) => (
                <div
                    key={`sparkle-${i}`}
                    className="absolute w-1 h-1 bg-white rounded-full twinkle-animation"
                    style={{
                        top: `${Math.random() * 50}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 3}s`,
                    }}
                />
            ))}
        </div>
    );
};

export default AnimatedCloudBackground;