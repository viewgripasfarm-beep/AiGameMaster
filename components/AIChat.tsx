import React, { useRef, useEffect } from 'react';
import type { ChatMessage } from '../types';

interface AIChatProps {
  messages: ChatMessage[];
  isLoading: boolean;
  onSendMessage: (message: string) => void;
  input: string;
  setInput: (value: string) => void;
}

const TypingIndicator: React.FC = () => (
  <div className="flex items-center space-x-1.5 p-3">
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
    <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
  </div>
);


export const AIChat: React.FC<AIChatProps> = ({ messages, isLoading, onSendMessage, input, setInput }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  useEffect(() => {
    if (input) {
      inputRef.current?.focus();
    }
  }, [input]);

  const handleSendMessage = () => {
    onSendMessage(input);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto pr-2 space-y-4" style={{ scrollbarWidth: 'thin' }}>
        {messages.map((msg, index) => (
          <div key={index} className={`flex items-end gap-2 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'ai' && (
              <div className="w-8 h-8 bg-surface2 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-robot text-primary"></i>
              </div>
            )}
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-3 prose prose-sm prose-p:my-1 prose-headings:my-2 ${
                msg.sender === 'user'
                  ? 'bg-primary text-white rounded-t-xl rounded-bl-xl'
                  : 'bg-surface2 text-text rounded-t-xl rounded-br-xl'
              }`}
            >
              {/* A simple markdown renderer for bold text */}
              {msg.text.split(/(\*\*.*?\*\*)/g).map((part, i) =>
                part.startsWith('**') && part.endsWith('**') ? (
                  <strong key={i}>{part.slice(2, -2)}</strong>
                ) : (
                  part
                )
              )}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-end gap-2 justify-start">
             <div className="w-8 h-8 bg-surface2 rounded-full flex items-center justify-center flex-shrink-0">
                <i className="fa-solid fa-robot text-primary"></i>
              </div>
            <div className="bg-surface2 rounded-t-xl rounded-br-xl">
              <TypingIndicator />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>
      <div className="mt-4 flex items-center gap-2 border-t border-border pt-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Hỏi AI để luyện tập thêm..."
          className="flex-1 bg-surface2 border border-border py-2 px-4 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent rounded-full"
          disabled={isLoading}
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !input.trim()}
          className="w-10 h-10 bg-primary flex items-center justify-center text-white rounded-full hover:opacity-90 disabled:bg-surface2 disabled:cursor-not-allowed transition-all"
        >
          <i className="fa-solid fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
};