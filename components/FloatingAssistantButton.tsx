"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "@/context/AppContext";

interface FloatingAssistantButtonProps {
    onOpenMenu: () => void;
    isMenuOpen: boolean;
}

const FloatingAssistantButton: React.FC<FloatingAssistantButtonProps> = ({
    onOpenMenu,
    isMenuOpen,
}) => {
    const [position, setPosition] = useState({ x: 20, y: 100 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [hasMoved, setHasMoved] = useState(false);
    const buttonRef = useRef<HTMLDivElement>(null);
    const { notifications } = useApp();

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        setDragStart({
            x: touch.clientX - position.x,
            y: touch.clientY - position.y,
        });
        setIsDragging(true);
        setHasMoved(false);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setDragStart({
            x: e.clientX - position.x,
            y: e.clientY - position.y,
        });
        setIsDragging(true);
        setHasMoved(false);
    };

    const handleMove = useCallback(
        (clientX: number, clientY: number) => {
            if (!isDragging) return;

            const newX = clientX - dragStart.x;
            const newY = clientY - dragStart.y;

            const deltaX = Math.abs(newX - position.x);
            const deltaY = Math.abs(newY - position.y);

            if (deltaX > 5 || deltaY > 5) {
                setHasMoved(true);
            }

            const maxX = window.innerWidth - 60;
            const maxY = window.innerHeight - 60;

            setPosition({
                x: Math.max(0, Math.min(newX, maxX)),
                y: Math.max(0, Math.min(newY, maxY)),
            });
        },
        [isDragging, dragStart, position]
    );

    const handleEnd = useCallback(() => {
        if (!isDragging) return;
        setIsDragging(false);

        // Snap to edge
        const snapThreshold = window.innerWidth / 2;
        setPosition((prev) => ({
            x: prev.x < snapThreshold ? 20 : window.innerWidth - 80,
            y: prev.y,
        }));
    }, [isDragging]);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX, e.clientY);
        const handleTouchMove = (e: TouchEvent) => {
            if (e.touches[0]) handleMove(e.touches[0].clientX, e.touches[0].clientY);
        };
        const handleMouseUp = () => handleEnd();
        const handleTouchEnd = () => handleEnd();

        if (isDragging) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("touchmove", handleTouchMove);
            window.addEventListener("mouseup", handleMouseUp);
            window.addEventListener("touchend", handleTouchEnd);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("touchmove", handleTouchMove);
            window.removeEventListener("mouseup", handleMouseUp);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isDragging, handleMove, handleEnd]);

    const handleClick = () => {
        if (!hasMoved) {
            onOpenMenu();
        }
    };

    return (
        <div
            ref={buttonRef}
            className={`fixed z-50 transition-transform duration-300 ${isMenuOpen ? "scale-110" : "scale-100"
                }`}
            style={{
                left: position.x,
                top: position.y,
                touchAction: "none",
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleTouchStart}
            onClick={handleClick}
        >
            <div
                className={`relative w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center cursor-pointer transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/40 ${isMenuOpen ? "ring-4 ring-blue-300/50" : ""
                    }`}
            >
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent" />
                <Sparkles className="w-6 h-6 text-white" />

                {/* Notification Badge */}
                {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs font-bold animate-bounce">
                        {notifications}
                    </div>
                )}

                {/* Pulse Animation */}
                <div className="absolute inset-0 rounded-full bg-blue-400 animate-ping opacity-25" />
            </div>
        </div>
    );
};

export default FloatingAssistantButton;