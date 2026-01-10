import { useState, useRef, useEffect } from "react";
import { X, Send, Bot, User, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface AiChatPanelProps {
  open: boolean;
  onClose: () => void;
}

const quickQueries = [
  "Last week sales?",
  "Monthly revenue report",
  "Top selling vehicles",
  "Pending approvals count",
];

// Simulated AI responses based on queries
const getAiResponse = (query: string): string => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes("last week") && lowerQuery.includes("sale")) {
    return `📊 **Last Week Sales Summary**\n\n• Total Sales: **47 vehicles**\n• Revenue: **৳1,247,500**\n• Average Price: **৳26,542**\n• Top Category: SUVs (18 units)\n\n📈 This represents a **12% increase** from the previous week!`;
  }
  
  if (lowerQuery.includes("monthly") || lowerQuery.includes("month")) {
    return `📋 **Monthly Report - December 2024**\n\n**Sales Performance:**\n• Vehicles Sold: 186\n• Total Revenue: ৳4,892,300\n• Avg. Days on Lot: 12\n\n**Inventory Status:**\n• Pending Approval: 23\n• Active Listings: 145\n• Sold This Month: 186\n\n**Top Performers:**\n1. Toyota Camry - 24 units\n2. Honda CR-V - 19 units\n3. Ford F-150 - 17 units`;
  }
  
  if (lowerQuery.includes("top") && lowerQuery.includes("selling")) {
    return `🏆 **Top Selling Vehicles (This Month)**\n\n1. **Toyota Camry** - 24 units (৳576,000)\n2. **Honda CR-V** - 19 units (৳608,000)\n3. **Ford F-150** - 17 units (৳765,000)\n4. **Tesla Model 3** - 15 units (৳675,000)\n5. **BMW X5** - 12 units (৳840,000)\n\n💡 SUVs continue to dominate sales this quarter!`;
  }
  
  if (lowerQuery.includes("pending")) {
    return `⏳ **Pending Items Overview**\n\n**Vehicle Approvals:**\n• New Submissions: 8\n• Under Review: 12\n• Awaiting Documents: 3\n\n**Payment Processing:**\n• Pending Payments: 14\n• Total Amount: ৳367,800\n\n🔔 Recommend prioritizing the 3 vehicles awaiting documents.`;
  }
  
  return `I've analyzed your query: "${query}"\n\n📊 Based on current data:\n• Total Active Listings: 145\n• Pending Actions: 23\n• Today's Revenue: ৳89,500\n\nHow can I help you further? Try asking about:\n- Sales trends\n- Inventory status\n- Payment reports\n- Performance metrics`;
};

export function AiChatPanel({ open, onClose }: AiChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "👋 Hi! I'm your AI assistant. Ask me anything about your sales, inventory, or analytics. Try questions like:\n\n• \"Last week sales?\"\n• \"Monthly revenue report\"\n• \"Top selling vehicles\"",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async (query?: string) => {
    const messageText = query || input;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: messageText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate AI thinking
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAiResponse(messageText),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Panel */}
      <div
        className={cn(
          "fixed right-0 top-0 z-50 h-screen w-full max-w-md border-l border-border bg-card shadow-2xl transition-transform duration-300 ease-in-out",
          open ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h2 className="font-semibold text-foreground">AI Assistant</h2>
              <p className="text-xs text-muted-foreground">Ask anything about your data</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Queries */}
        <div className="border-b border-border p-3">
          <p className="mb-2 text-xs font-medium text-muted-foreground">Quick queries:</p>
          <div className="flex flex-wrap gap-2">
            {quickQueries.map((query) => (
              <button
                key={query}
                onClick={() => handleSend(query)}
                className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground transition-all duration-200 hover:bg-primary hover:text-primary-foreground"
              >
                {query}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="h-[calc(100vh-220px)] p-4" ref={scrollRef}>
          <div className="flex flex-col gap-4">
            {messages.map((message, index) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in-up",
                  message.role === "user" ? "flex-row-reverse" : ""
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground"
                  )}
                >
                  {message.role === "user" ? (
                    <User className="h-4 w-4" />
                  ) : (
                    <Bot className="h-4 w-4" />
                  )}
                </div>
                <div
                  className={cn(
                    "max-w-[80%] rounded-2xl px-4 py-3 text-sm",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent text-accent-foreground"
                  )}
                >
                  <div className="whitespace-pre-wrap">{message.content}</div>
                  <p className="mt-1 text-[10px] opacity-60">
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-accent px-4 py-3">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Analyzing...</span>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-border bg-card p-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about sales, inventory, analytics..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </div>
    </>
  );
}
