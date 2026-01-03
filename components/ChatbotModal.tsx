"use client";

import React, { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";
import { Message } from "@/types";
import ModalWrapper from "./ModalWrapper";

interface ChatbotModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const botResponses: Record<string, string> = {
    hotel:
        "🏨 Here are top hotels in Tokyo:\n\n• **Park Hyatt Tokyo** - Luxury, stunning views ($$$)\n• **Aman Tokyo** - Modern luxury, spa ($$$)\n• **The Peninsula Tokyo** - Imperial Palace views ($$$)\n• **Shinjuku Granbell Hotel** - Great location ($$)",
    restaurant:
        "🍣 Must-try restaurants in Tokyo:\n\n• **Sukiyabashi Jiro** - World-famous sushi\n• **Narisawa** - Innovative Japanese cuisine\n• **Ichiran** - Best ramen experience\n• **Gonpachi** - Traditional izakaya",
    attraction:
        "🎌 Top attractions in Tokyo:\n\n• **Senso-ji Temple** - Ancient Buddhist temple\n• **Tokyo Skytree** - 634m observation tower\n• **Shibuya Crossing** - Iconic intersection\n• **Meiji Shrine** - Peaceful Shinto shrine",
    default:
        "I can help you find hotels, restaurants, and attractions in Tokyo. What would you like to know about?",
};

const ChatbotModal: React.FC<ChatbotModalProps> = ({ isOpen, onClose }) => {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            text: "Hello! I'm your travel assistant. Ask me about hotels, restaurants, or attractions in Tokyo! 🗼",
            sender: "bot",
            timestamp: new Date(),
        },
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            text: input,
            sender: "user",
            timestamp: new Date(),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        setTimeout(() => {
            let response = botResponses.default;
            const lowerInput = input.toLowerCase();

            if (lowerInput.includes("hotel")) response = botResponses.hotel;
            else if (lowerInput.includes("restaurant") || lowerInput.includes("food"))
                response = botResponses.restaurant;
            else if (
                lowerInput.includes("attraction") ||
                lowerInput.includes("see") ||
                lowerInput.includes("visit")
            )
                response = botResponses.attraction;

            const botMessage: Message = {
                id: (Date.now() + 1).toString(),
                text: response,
                sender: "bot",
                timestamp: new Date(),
            };

            setMessages((prev) => [...prev, botMessage]);
            setIsTyping(false);
        }, 1500);
    };

    return (
        <ModalWrapper isOpen={isOpen} onClose={onClose} title="Travel Guide">
            <div className="flex flex-col h-full">
                {/* Messages */}
                <div className="flex-1 p-4 space-y-4 overflow-y-auto">
                    {messages.map((message, index) => (
                        <div
                            key={message.id}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"
                                } animate-fade-in-up`}
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <div
                                className={`max-w-[80%] p-4 rounded-2xl ${message.sender === "user"
                                        ? "bg-gradient-to-br from-blue-500 to-indigo-600 text-white rounded-br-sm"
                                        : "bg-gray-100 text-gray-800 rounded-bl-sm"
                                    }`}
                            >
                                <p className="whitespace-pre-line text-sm">{message.text}</p>
                            </div>
                        </div>
                    ))}

                    {isTyping && (
                        <div className="flex justify-start animate-fade-in-up">
                            <div className="bg-gray-100 p-4 rounded-2xl rounded-bl-sm">
                                <div className="flex gap-1">
                                    {[0, 1, 2].map((i) => (
                                        <div
                                            key={i}
                                            className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                                            style={{ animationDelay: `${i * 150}ms` }}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Quick Actions */}
                <div className="px-4 pb-2">
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        {["Hotels", "Restaurants", "Attractions"].map((action) => (
                            <button
                                key={action}
                                onClick={() => setInput(`Tell me about ${action.toLowerCase()}`)}
                                className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium whitespace-nowrap hover:bg-blue-100 transition-colors"
                            >
                                {action}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Input */}
                <div className="p-4 border-t border-gray-100">
                    <div className="flex gap-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Ask about your destination..."
                            className="flex-1 px-4 py-3 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                        <button
                            onClick={handleSend}
                            className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
                        >
                            <Send className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>
        </ModalWrapper>
    );
};

export default ChatbotModal;