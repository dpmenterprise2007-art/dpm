import { Bot, X, Send, Minimize2, Maximize2 } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export default function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Namaste! 🙏 I am DPM ENTERPRISE Virtual Assistant. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const getAIResponse = (userMessage: string): string => {
    const msg = userMessage.toLowerCase();

    if (msg.includes('service') || msg.includes('what do you do')) {
      return 'We offer 7 core services:\n\n1. Architectural Solutions\n2. Corporate Interior Design\n3. Commercial & Showrooms\n4. Defense & Government Projects\n5. Residential Interior\n6. Furniture Manufacturing\n7. Turnkey Solutions\n\nWhich service interests you?';
    }

    if (msg.includes('navy') || msg.includes('army') || msg.includes('defense') || msg.includes('government') || msg.includes('gem')) {
      return 'Yes! We are proud partners of:\n\n✅ Indian Navy\n✅ Indian Army\n✅ Indian Railways\n✅ Government Universities\n\nWe are GeM-approved vendors and specialize in high-security, mission-critical projects. Would you like to discuss a government project?';
    }

    if (msg.includes('experience') || msg.includes('how long') || msg.includes('years')) {
      return 'DPM ENTERPRISE has 18+ years of excellence since 2007. We have completed 500+ projects for 50+ corporate and government clients across India.';
    }

    if (msg.includes('certified') || msg.includes('iso') || msg.includes('msme')) {
      return 'We hold these certifications:\n\n🏆 ISO 9001:2015 Certified\n🏆 MSME Registered (UDYAM-MH-19-0084438)\n🏆 GeM Approved Vendor\n🏆 Startup India Certified';
    }

    if (msg.includes('contact') || msg.includes('phone') || msg.includes('email')) {
      return 'You can reach us at:\n\n📞 Landline: 022 6971 9769\n📱 Mobile: +91 99309 98063\n📧 Email: admin@dpmenterprise.in\n📍 Address: 35 Florence Building, Work City, Virar East, Maharashtra 401305';
    }

    if (msg.includes('price') || msg.includes('quote')) {
      return 'For an accurate quote, please:\n\n1. Click "Request Quote" button\n2. Call us at 022 6971 9769\n3. WhatsApp us at +91 99309 98063\n\nOur team will provide a detailed proposal within 24 hours.';
    }

    if (msg.includes('furniture') || msg.includes('manufacturing')) {
      return 'We have a state-of-the-art in-house manufacturing facility with:\n\n✅ Advanced CNC machinery\n✅ Skilled master craftsmen\n✅ Quality control at every stage\n✅ Custom furniture design & production';
    }

    return 'Thank you for your question! For detailed information, please:\n\n1. Explore our website sections\n2. Call us at 022 6971 9769\n3. WhatsApp us at +91 99309 98063\n\nOur team is ready to assist you!';
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 bg-primary hover:bg-primary/90 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110"
          aria-label="Open AI Assistant"
        >
          <Bot className="h-7 w-7" />
          <span className="absolute -top-1 -right-1 bg-accent text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-pulse">
            AI
          </span>
        </button>
      )}

      {isOpen && (
        <div
          className={`fixed z-50 bg-background border-2 border-primary rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized ? 'bottom-24 right-6 w-80 h-16' : 'bottom-6 right-6 w-96 h-[600px] md:w-[420px]'
          }`}
        >
          <div className="bg-primary text-white p-4 rounded-t-2xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white/20 p-2 rounded-full">
                <Bot className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">DPM Virtual Assistant</h3>
                <p className="text-xs text-white/80">Online • Instant Reply</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-1.5 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4" /> : <Minimize2 className="h-4 w-4" />}
              </button>
              <button onClick={() => setIsOpen(false)} className="hover:bg-white/20 p-1.5 rounded transition-colors">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {!isMinimized && (
            <>
              <ScrollArea className="h-[440px] p-4" ref={scrollRef}>
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[80%] rounded-2xl px-4 py-2.5 ${
                          message.sender === 'user'
                            ? 'bg-primary text-white rounded-br-none'
                            : 'bg-muted text-foreground rounded-bl-none'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line leading-relaxed">{message.text}</p>
                        <p className="text-xs mt-1 opacity-70">
                          {message.timestamp.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                  ))}

                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-muted rounded-2xl rounded-bl-none px-4 py-3">
                        <div className="flex gap-1.5">
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce" />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.2s]" />
                          <div className="w-2 h-2 bg-primary/60 rounded-full animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">Powered by DPM AI • 18+ Years Experience</p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
