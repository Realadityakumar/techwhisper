import React from "react";
import { motion } from "framer-motion";

interface ChatHeaderProps {
  title?: string;
  subtitle?: string;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  title = "TechWhisper",
  subtitle = "AI-Powered Tech Support",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full glass-panel py-4 px-6 mb-6 rounded-xl backdrop-blur-lg border-b border-white/10"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 rounded-lg bg-ai-avatar-gradient flex items-center justify-center">
            <div className="h-5 w-5 rounded-sm bg-chatbot-secondary border border-white/10 animate-pulse-light" />
          </div>
          <div>
            <h1 className="text-lg font-medium text-chatbot-white">{title}</h1>
            <p className="text-xs text-chatbot-white/60">{subtitle}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ChatHeader;
