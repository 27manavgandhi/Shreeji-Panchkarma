"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Leaf, Minimize2 } from "lucide-react";

interface Message {
  id: string;
  role: "bot" | "user";
  text: string;
}

const WELCOME: Message = {
  id: "welcome",
  role: "bot",
  text: "🙏 Namaste! Welcome to Shreeji Panchkarma.\n\nI'm your Ayurvedic wellness assistant. I'm currently under construction and will soon be able to help you with:\n\n• Booking consultations\n• Treatment information\n• Product queries\n• General Ayurvedic guidance\n\nFor immediate assistance, please call us at +91 98765 43210 or use the Contact page.",
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [pulse, setPulse] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 100);
      setPulse(false);
    }
  }, [open, messages]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: Message = { id: Date.now().toString(), role: "user", text: input.trim() };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [
        ...m,
        {
          id: Date.now().toString() + "b",
          role: "bot",
          text: "🚧 Our AI assistant is currently under construction.\n\nPlease contact us directly:\n📞 +91 98765 43210\n✉️ info@shreejipanchkarma.com\n\nOr visit our Contact page to book a free consultation with Dr. Sharma.",
        },
      ]);
    }, 1200);
  };

  return (
    <>
      {/* Toggle Button */}
      <motion.button
        onClick={() => setOpen((v) => !v)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-[80] w-14 h-14 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        style={{
          background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)",
          boxShadow: "0 8px 32px rgba(27,67,50,0.4)",
        }}
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {/* Pulse ring */}
        <AnimatePresence>
          {pulse && !open && (
            <motion.div
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.8, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop" }}
              className="absolute inset-0 rounded-full bg-primary"
            />
          )}
        </AnimatePresence>
        <AnimatePresence mode="wait">
          {open ? (
            <motion.span key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Minimize2 size={20} className="text-white" />
            </motion.span>
          ) : (
            <motion.span key="leaf" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
              <Leaf size={20} className="text-white" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, originX: 0, originY: 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed bottom-24 left-4 right-4 sm:left-6 sm:right-auto sm:w-[360px] z-[79] flex flex-col rounded-2xl overflow-hidden"
            style={{
              boxShadow: "0 24px 80px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08)",
              maxHeight: "calc(100vh - 140px)",
            }}
          >
            {/* Header */}
            <div
              className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #1B4332 0%, #2D6A4F 100%)" }}
            >
              <div className="w-9 h-9 rounded-full bg-white/15 border border-white/25 flex items-center justify-center flex-shrink-0">
                <Leaf size={16} className="text-accent" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-cormorant font-600 text-white text-base leading-none">
                  Ayur Assistant
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <p className="font-raleway text-white/60 text-xs">Shreeji Panchkarma</p>
                </div>
              </div>
              <div className="flex-shrink-0 bg-accent/25 text-accent text-[10px] font-raleway font-600 px-2 py-0.5 rounded-full">
                🚧 Beta
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1.5 text-white/60 hover:text-white transition-colors cursor-pointer flex-shrink-0"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-cream p-4 space-y-3" style={{ minHeight: 0 }}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  {msg.role === "bot" && (
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center mr-2 mt-1 flex-shrink-0">
                      <Leaf size={11} className="text-primary" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] px-4 py-3 rounded-2xl text-sm font-raleway leading-relaxed whitespace-pre-line ${
                      msg.role === "user"
                        ? "bg-primary text-white rounded-br-sm"
                        : "bg-white text-forest-muted border border-cream-section rounded-bl-sm shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              <AnimatePresence>
                {typing && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="w-6 h-6 rounded-full bg-primary/15 flex items-center justify-center flex-shrink-0">
                      <Leaf size={11} className="text-primary" />
                    </div>
                    <div className="bg-white border border-cream-section rounded-2xl rounded-bl-sm px-4 py-3 flex gap-1 items-center shadow-sm">
                      {[0, 0.2, 0.4].map((d) => (
                        <motion.div
                          key={d}
                          animate={{ y: [0, -4, 0] }}
                          transition={{ duration: 0.6, delay: d, repeat: Infinity }}
                          className="w-1.5 h-1.5 rounded-full bg-primary/40"
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              <div ref={bottomRef} />
            </div>

            {/* Under construction notice */}
            <div className="bg-amber-50 border-t border-amber-100 px-4 py-2 flex-shrink-0">
              <p className="text-[11px] font-raleway text-amber-700 text-center">
                🚧 AI assistant under construction · Call +91 98765 43210 for help
              </p>
            </div>

            {/* Input */}
            <div className="bg-white border-t border-cream-section px-3 py-3 flex gap-2 flex-shrink-0">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
                placeholder="Type a message..."
                className="flex-1 bg-cream rounded-xl px-3.5 py-2.5 text-sm font-raleway text-forest placeholder-forest-muted/40 focus:outline-none focus:ring-1 focus:ring-primary/30 border border-cream-section"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-primary-dark transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer flex-shrink-0"
                aria-label="Send message"
              >
                <Send size={15} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
