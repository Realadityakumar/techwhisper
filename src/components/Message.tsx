import React from "react";
import { motion } from "framer-motion";
import { LucideIcon, Code, ArrowRight, Copy } from "lucide-react";
import ReactMarkdown from "react-markdown";

export interface MessageProps {
  content: string;
  isUser: boolean;
  timestamp?: string;
  codeSnippet?: string;
  icon?: LucideIcon;
}

const Message: React.FC<MessageProps> = ({
  content,
  isUser,
  timestamp,
  codeSnippet,
  icon: Icon,
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <motion.div
      className={`flex w-full mb-4 ${isUser ? "justify-end" : "justify-start"}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {!isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-ai-avatar-gradient flex items-center justify-center mr-3 mt-1 overflow-hidden border border-white/10">
          {Icon ? (
            <Icon className="w-4 h-4 text-white" />
          ) : (
            <div className="w-4 h-4 rounded-sm bg-chatbot-secondary border border-chatbot-cyan/30" />
          )}
        </div>
      )}

      <div className={`max-w-[75%] flex flex-col`}>
        <div
          className={`relative px-4 py-3 rounded-xl ${
            isUser
              ? "bg-chatbot-user-bubble border border-white/10 text-chatbot-white"
              : "bg-chatbot-ai-bubble border border-white/5 text-chatbot-white bg-message-gradient"
          }`}
        >
          {isUser ? (
            <div className="text-sm leading-relaxed">{content}</div>
          ) : (
            <div className="text-sm leading-relaxed markdown-body bg-transparent">
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }) {
                    if (inline) {
                      return (
                        <code
                          className="bg-black/20 px-1 py-0.5 rounded text-chatbot-cyan"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    }
                    return (
                      <div className="mt-3 bg-black/30 rounded-md border border-white/5 overflow-hidden">
                        <div className="flex items-center justify-between px-3 py-1 bg-black/50 border-b border-white/5">
                          <div className="flex items-center">
                            <Code
                              size={14}
                              className="text-chatbot-cyan mr-2"
                            />
                            <span className="text-xs text-chatbot-white/70">
                              Code
                            </span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(String(children))}
                            className="text-xs text-chatbot-white/70 hover:text-chatbot-cyan transition-colors flex items-center"
                          >
                            <span>Copy</span>
                            <Copy size={12} className="ml-1" />
                          </button>
                        </div>
                        <pre className="p-3 text-xs overflow-x-auto scrollbar-thin text-chatbot-white/90">
                          <code>{children}</code>
                        </pre>
                      </div>
                    );
                  },
                }}
              >
                {content}
              </ReactMarkdown>
            </div>
          )}

          {codeSnippet && (
            <div className="mt-3 bg-black/30 rounded-md border border-white/5 overflow-hidden">
              <div className="flex items-center justify-between px-3 py-1 bg-black/50 border-b border-white/5">
                <div className="flex items-center">
                  <Code size={14} className="text-chatbot-cyan mr-2" />
                  <span className="text-xs text-chatbot-white/70">Code</span>
                </div>
                <button
                  onClick={() => copyToClipboard(codeSnippet)}
                  className="text-xs text-chatbot-white/70 hover:text-chatbot-cyan transition-colors flex items-center"
                >
                  <span>Copy</span>
                  <Copy size={12} className="ml-1" />
                </button>
              </div>
              <pre className="p-3 text-xs overflow-x-auto scrollbar-thin text-chatbot-white/90">
                <code>{codeSnippet}</code>
              </pre>
            </div>
          )}
        </div>

        {timestamp && (
          <div
            className={`text-xs text-chatbot-white/40 mt-1 ${
              isUser ? "text-right" : "text-left"
            }`}
          >
            {timestamp}
          </div>
        )}
      </div>

      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-chatbot-purple/20 border border-chatbot-purple/30 flex items-center justify-center ml-3 mt-1 overflow-hidden">
          <div className="w-4 h-4 rounded-sm bg-chatbot-purple/30" />
        </div>
      )}
    </motion.div>
  );
};

export default Message;
