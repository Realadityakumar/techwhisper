
import React from 'react';
import { motion } from 'framer-motion';

interface TypingIndicatorProps {
  visible: boolean;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ visible }) => {
  if (!visible) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      className="flex items-center space-x-2 px-4 py-3 bg-chatbot-secondary/20 rounded-xl max-w-[12rem] mb-4 border border-white/5"
    >
      <div className="flex space-x-2 items-center">
        <div className="w-6 h-6 rounded-full bg-ai-avatar-gradient flex items-center justify-center mr-2 overflow-hidden border border-white/10">
          <div className="w-3 h-3 rounded-sm bg-chatbot-secondary border border-chatbot-cyan/30" />
        </div>
        <span className="w-2 h-2 rounded-full bg-chatbot-cyan animate-typing-dot-1"></span>
        <span className="w-2 h-2 rounded-full bg-chatbot-cyan animate-typing-dot-2"></span>
        <span className="w-2 h-2 rounded-full bg-chatbot-cyan animate-typing-dot-3"></span>
      </div>
    </motion.div>
  );
};

export default TypingIndicator;
