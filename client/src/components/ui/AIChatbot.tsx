import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, X, Send, Bot, User, Minimize2, Maximize2 } from "lucide-react";

interface Message {
  id: string;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Hekfa's AI assistant. I can help you learn about our AI solutions, projects, and services. What would you like to know?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const predefinedResponses: Record<string, string> = {
    "hello": "Hello! Welcome to Hekfa AI Division. How can I assist you today?",
    "projects": "We have several exciting AI projects including Face Recognition Systems, Smart Parking Solutions, RAG for LLMs, AI Animation Generator, and Speech-to-Text engines. Which one interests you most?",
    "face recognition": "Our Face Recognition System offers 99.7% accuracy with real-time processing capabilities. It's used for security and identity verification across multiple industries.",
    "smart parking": "Our Smart Parking Solution uses AI-powered vehicle detection and license plate recognition, improving parking efficiency by 45% with 24/7 monitoring capabilities.",
    "rag": "Our RAG (Retrieval-Augmented Generation) system enhances large language models with domain-specific knowledge, achieving 94.2% accuracy with sub-2-second response times.",
    "contact": "You can reach us at contact@hekfa.ai or call +1 (555) 123-4567. We're based in San Francisco, CA, with offices in London and Singapore.",
    "about": "Hekfa AI Division specializes in cutting-edge artificial intelligence research and development. We focus on Neural Networks, Machine Learning, Computer Vision, and advanced AI technologies.",
    "team": "Our team consists of world-class AI researchers and engineers, including Dr. Sarah Chen (Chief AI Scientist), Marcus Rodriguez (VP of Computer Vision), and Dr. Aisha Patel (Director of Machine Learning).",
    "research": "We've published 50+ research papers with 2,500+ citations, presented at 25+ conferences, and maintain active collaborations with leading institutions worldwide.",
    "pricing": "Our pricing varies based on project scope and requirements. Please contact our sales team at contact@hekfa.ai for a custom quote tailored to your needs.",
    "demo": "We'd be happy to provide a demo of our AI solutions! Please visit our contact page to schedule a personalized demonstration with our team.",
  };

  const getAIResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    for (const [key, response] of Object.entries(predefinedResponses)) {
      if (input.includes(key)) {
        return response;
      }
    }
    
    // Default responses for common patterns
    if (input.includes("how") || input.includes("what") || input.includes("?")) {
      return "That's a great question! For detailed information about our AI solutions and services, I recommend exploring our Projects and Research pages, or contacting our team directly at contact@hekfa.ai.";
    }
    
    if (input.includes("thank")) {
      return "You're welcome! Is there anything else you'd like to know about Hekfa's AI technologies?";
    }
    
    return "I'd be happy to help you with information about Hekfa's AI solutions! You can ask me about our projects, research, team, or how to get in touch. What specific area interests you?";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputText),
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "Tell me about your projects",
    "How can I contact you?",
    "What research do you do?",
    "Who is your team?",
  ];

  return (
    <>
      {/* Floating Chat Button with Enhanced Design */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-8 right-8 z-50 group"
            whileHover="hover"
          >
            {/* Tooltip */}
            <motion.div
              initial={{ opacity: 0, x: 10 }}
              variants={{
                hover: { opacity: 1, x: 0 }
              }}
              className="absolute right-20 top-1/2 -translate-y-1/2 whitespace-nowrap rounded-lg bg-card/95 backdrop-blur-sm px-4 py-2 text-sm text-foreground border border-primary/30 shadow-lg pointer-events-none"
            >
               Ask Hekfa AI anything!
            </motion.div>

            {/* Button with pulsing animation */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative"
              animate={{
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Glowing border effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary opacity-75 blur-lg group-hover:opacity-100 transition-opacity" />
              
              {/* Button content */}
              <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-xl border-2 border-primary/50">
                <MessageCircle className="h-8 w-8 text-background" />
              </div>

              {/* Pulse rings */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-primary/30"
                animate={{
                  scale: [1, 1.4],
                  opacity: [0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }}
              />
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-secondary/30"
                animate={{
                  scale: [1, 1.4],
                  opacity: [0.8, 0]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }}
              />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              y: 0,
              height: isMinimized ? "auto" : "600px"
            }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50 w-96 max-w-[calc(100vw-2rem)]"
          >
            <Card className="neural-card overflow-hidden">
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-4 border-b border-primary/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-full bg-gradient-to-br from-primary to-secondary relative">
                      <Bot className="h-5 w-5 text-background" />
                      <div className="absolute inset-0 rounded-full bg-primary/20 animate-ping" />
                    </div>
                    <div>
                      <h3 className="font-semibold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Hekfa AI Assistant</h3>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-secondary rounded-full animate-pulse" />
                        <span className="text-xs text-muted-foreground">Online</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMinimized(!isMinimized)}
                    >
                      {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Chat Content */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="p-0">
                      {/* Messages */}
                      <div className="h-96 overflow-y-auto p-4 space-y-4">
                        {messages.map((message) => (
                          <motion.div
                            key={message.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <div className={`flex items-start space-x-2 max-w-[80%] ${message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""}`}>
                              <div className={`p-2 rounded-lg ${message.sender === "user" ? "bg-secondary/20" : "bg-primary/20"}`}>
                                {message.sender === "user" ? (
                                  <User className="h-4 w-4 text-secondary" />
                                ) : (
                                  <Bot className="h-4 w-4 text-primary" />
                                )}
                              </div>
                              <div className={`p-3 rounded-lg ${message.sender === "user" ? "bg-secondary/20 text-right" : "bg-card border border-border/50"}`}>
                                <p className="text-sm leading-relaxed">{message.text}</p>
                                <span className="text-xs text-muted-foreground mt-1 block">
                                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing Indicator */}
                        {isTyping && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex justify-start"
                          >
                            <div className="flex items-center space-x-2">
                              <div className="p-2 rounded-lg bg-primary/20">
                                <Bot className="h-4 w-4 text-primary" />
                              </div>
                              <div className="p-3 rounded-lg bg-card border border-border/50">
                                <div className="flex space-x-1">
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                                  <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </div>

                      {/* Quick Questions */}
                      {messages.length === 1 && (
                        <div className="px-4 pb-4">
                          <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
                          <div className="flex flex-wrap gap-2">
                            {quickQuestions.map((question) => (
                              <Badge
                                key={question}
                                variant="outline"
                                className="cursor-pointer hover:bg-primary/10 transition-colors text-xs"
                                onClick={() => {
                                  setInputText(question);
                                  setTimeout(() => handleSendMessage(), 100);
                                }}
                              >
                                {question}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Input */}
                      <div className="p-4 border-t border-border/50">
                        <div className="flex space-x-2">
                          <Input
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about our AI solutions..."
                            className="flex-1"
                          />
                           <Button
                            onClick={handleSendMessage}
                            disabled={!inputText.trim() || isTyping}
                            className="bg-gradient-to-r from-primary to-secondary hover:opacity-90 shadow-lg hover:shadow-primary/50"
                          >
                            <Send className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChatbot;