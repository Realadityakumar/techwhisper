import React, { useState } from "react";
import { motion } from "framer-motion";
import { SendHorizonal, X } from "lucide-react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  disabled = false,
  placeholder = "Type your question here...",
}) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-3xl mx-auto mb-6"
    >
      <form
        onSubmit={handleSubmit}
        className="relative glass-panel rounded-xl p-1 backdrop-blur-xl"
      >
        <div className="relative flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={disabled}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-none text-chatbot-white placeholder-chatbot-white/30 px-3 py-2 focus:outline-none focus:ring-0"
          />

          {message && (
            <button
              type="button"
              onClick={() => setMessage("")}
              className="p-2 rounded-full text-chatbot-white/40 hover:text-chatbot-white/70 transition-colors"
            >
              <X size={16} />
            </button>
          )}

          <button
            type="submit"
            disabled={!message.trim() || disabled}
            className={`p-2 rounded-full text-white ${
              !message.trim() || disabled
                ? "opacity-50 cursor-not-allowed"
                : "bg-gradient-to-r from-chatbot-cyan to-chatbot-purple hover:from-chatbot-cyan/90 hover:to-chatbot-purple/90"
            } transition-all duration-300 ml-1`}
          >
            <SendHorizonal
              size={20}
              className={`${
                !message.trim() ? "text-chatbot-white/50" : "text-white"
              }`}
            />
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ChatInput;
