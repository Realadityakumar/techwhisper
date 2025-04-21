import React, { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import ChatHeader from "./ChatHeader";
import Message from "./Message";
import TypingIndicator from "./TypingIndicator";
import ChatInput from "./ChatInput";
import { MessageSquare, Database, Cpu } from "lucide-react";
import { generateAIResponse } from "../services/groqService";

interface ChatMessage {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: string;
  codeSnippet?: string;
}

// Helper function to format timestamp
function formatTimestamp(date: Date): string {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Helper function to generate ID
function generateId(): string {
  return Math.random().toString(36).substring(2, 11);
}

// Initial welcome message
const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: "1",
    content:
      "Hello! I'm your AI **tech support assistant**. How can I help you today with your technical issues?",
    isUser: false,
    timestamp: formatTimestamp(new Date()),
  },
];

const TechSupportChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [conversationHistory, setConversationHistory] = useState<
    Array<{ role: "user" | "assistant" | "system"; content: string }>
  >([
    {
      role: "system",
      content:
        `You are a strict technical support assistant. You ONLY answer questions related to tech support — like troubleshooting, installation help, performance issues, or hardware/software guidance.

If the question is unrelated to tech support — for example, about cooking, entertainment, general knowledge, personal advice, etc. — politely respond:
"I'm here to assist only with tech support related issues. Please ask a technical question."

Keep your answers brief, professional, and use markdown and code snippets only when explaining tech-related topics. Do not answer anything beyond the scope of tech support.`,
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: generateId(),
      content,
      isUser: true,
      timestamp: formatTimestamp(new Date()),
    };

    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setIsTyping(true);

    // Update conversation history
    const updatedHistory = [
      ...conversationHistory,
      { role: "user" as const, content },
    ];
    setConversationHistory(updatedHistory);

    try {
      // Generate AI response using Groq API
      const response = await generateAIResponse(updatedHistory);

      const aiMessage: ChatMessage = {
        id: generateId(),
        content: response,
        isUser: false,
        timestamp: formatTimestamp(new Date()),
      };

      setIsTyping(false);
      setMessages((prevMessages) => [...prevMessages, aiMessage]);

      setConversationHistory([
        ...updatedHistory,
        { role: "assistant" as const, content: response },
      ]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      setIsTyping(false);

      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: generateId(),
          content: "Sorry, I encountered an error. Please try again later.",
          isUser: false,
          timestamp: formatTimestamp(new Date()),
        },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <ChatHeader />

      <motion.div
        className="flex-1 overflow-y-auto px-4 scrollbar-thin"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-3xl mx-auto pt-4 pb-20">
          {messages.map((message) => (
            <Message
              key={message.id}
              content={message.content}
              isUser={message.isUser}
              timestamp={message.timestamp}
              codeSnippet={message.codeSnippet}
              icon={
                message.isUser
                  ? undefined
                  : [Cpu, Database, MessageSquare][
                      Math.floor(Math.random() * 3)
                    ]
              }
            />
          ))}

          <AnimatePresence>
            {isTyping && <TypingIndicator visible={isTyping} />}
          </AnimatePresence>

          <div ref={messagesEndRef} />
        </div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 px-4 pb-6 pt-10 bg-gradient-to-t from-chatbot-dark via-chatbot-dark to-transparent">
        <ChatInput
          onSendMessage={handleSendMessage}
          disabled={isTyping}
          placeholder="Ask about any tech issue..."
        />
      </div>
    </div>
  );
};

export default TechSupportChat;
