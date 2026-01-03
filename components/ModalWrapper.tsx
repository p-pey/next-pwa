"use client";

import React, { ReactNode } from "react";
import { X } from "lucide-react";

interface ModalWrapperProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: ReactNode;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({
    isOpen,
    onClose,
    title,
    children,
}) => {
    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-50 bg-black/30 backdrop-blur-md transition-opacity duration-500 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Modal */}
            <div
                className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none transition-all duration-500 ${isOpen ? "opacity-100" : "opacity-0"
                    }`}
            >
                <div
                    className={`w-full max-w-lg h-[90vh] bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden pointer-events-auto transform transition-all duration-500 ${isOpen ? "translate-y-0 scale-100" : "translate-y-8 scale-95"
                        }`}
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                        <h2 className="text-xl font-bold text-gray-800">{title}</h2>
                        <button
                            onClick={onClose}
                            className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                        >
                            <X className="w-5 h-5 text-gray-600" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="flex-1 overflow-y-auto h-[calc(90vh-72px)]">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ModalWrapper;