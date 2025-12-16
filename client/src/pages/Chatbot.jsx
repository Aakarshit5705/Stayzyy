import React, { useState, useRef, useEffect } from 'react';

// --- Sub-components with a Major Visual Overhaul ---

// The header with a richer gradient and refined typography.
const ChatHeader = () => (
    <div className="bg-gradient-to-br from-green-900 to-green-800 text-white p-4 rounded-t-2xl shadow-lg flex-shrink-0">
        <h3 className="font-bold text-lg">Travel Assistant</h3>
        <p className="text-sm text-green-200">Powered by Gemini</p>
    </div>
);

// The message list with a new background and improved bubble styling.
const MessageList = ({ messages, isLoading, messagesEndRef }) => (
    <div className="flex-1 h-96 p-4 overflow-y-auto bg-slate-100">
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className={`flex items-end animate-fade-in-up ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-md break-words ${message.role === 'user' ? 'bg-green-900 text-white rounded-br-none' : 'bg-white text-gray-800 rounded-bl-none'}`}>
                        {message.text}
                    </div>
                </div>
            ))}
            {isLoading && (
                <div className="flex justify-start animate-fade-in-up">
                    <div className="bg-white text-gray-500 px-4 py-3 rounded-2xl shadow-md rounded-bl-none flex items-center gap-2">
                        <span className="dot-flashing"></span>
                        <span className="dot-flashing" style={{animationDelay: '0.25s'}}></span>
                        <span className="dot-flashing" style={{animationDelay: '0.5s'}}></span>
                    </div>
                </div>
            )}
            <div ref={messagesEndRef} />
        </div>
    </div>
);

// The input form with a cleaner aesthetic.
const ChatInputForm = ({ input, setInput, handleSend, isLoading }) => (
    <form onSubmit={handleSend} className="p-4 border-t bg-white rounded-b-2xl flex-shrink-0">
        <div className="flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Ask for suggestions..."
                className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-700 transition"
                disabled={isLoading}
            />
            <button
                type="submit"
                className="bg-green-900 text-white rounded-full p-3 hover:bg-green-800 transition transform hover:scale-105 active:scale-95 disabled:bg-gray-400 disabled:scale-100"
                disabled={isLoading}
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5" />
                </svg>
            </button>
        </div>
    </form>
);

/**
 * A floating AI chatbot component with a significantly upgraded, modern UI.
 */
export default function Chatbot() {
    // --- State and Refs (No changes in logic) ---
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'model', text: "Hello! How can I help you find the perfect place to stay?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // --- Effects (No changes in logic) ---
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // --- Event Handlers (No changes in logic) ---
    const handleSend = async (event) => {
        event.preventDefault();
        if (!input.trim()) return;

        const userMessage = { role: 'user', text: input };
        setMessages(prevMessages => [...prevMessages, userMessage]);
        const currentInput = input;
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:4000/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: currentInput }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            
            const modelResponseText = await response.text();
            setMessages(prev => [...prev, { role: 'model', text: modelResponseText }]);

        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'model', text: "Sorry, I'm having trouble connecting. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            {/* Custom CSS for new animations */}
            <style>{`
                @keyframes fade-in-up {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-up {
                    animation: fade-in-up 0.4s ease-out forwards;
                }
                .dot-flashing {
                    position: relative;
                    width: 6px;
                    height: 6px;
                    border-radius: 5px;
                    background-color: #9ca3af;
                    color: #9ca3af;
                    animation: dot-flashing 1s infinite linear alternate;
                    animation-delay: 0s;
                }
                @keyframes dot-flashing {
                    0% { background-color: #9ca3af; }
                    50%, 100% { background-color: #d1d5db; }
                }
            `}</style>

            {/* The main chat window container with a flex layout */}
            <div className={`fixed bottom-24 right-4 sm:right-8 w-80 sm:w-96 h-[32rem] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200/50 transition-all duration-400 ease-in-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}>
                <ChatHeader />
                <MessageList messages={messages} isLoading={isLoading} messagesEndRef={messagesEndRef} />
                <ChatInputForm input={input} setInput={setInput} handleSend={handleSend} isLoading={isLoading} />
            </div>

            {/* The floating button with open/close icons */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-4 right-4 sm:right-8 bg-gradient-to-br from-green-800 to-green-900 text-white rounded-full p-4 shadow-lg transition-transform duration-300 transform hover:scale-110 hover:rotate-6"
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                )}
            </button>
        </>
    );
}

