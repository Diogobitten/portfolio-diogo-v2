'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { CHATBOT_API_URL } from '@/lib/constants';
import type { ChatMessage, ChatbotResponse } from '@/lib/types';

function renderMessageContent(content: string) {
  // Split on URLs (https://...) preserving them as separate tokens
  const parts = content.split(/(https?:\/\/[^\s)<>]+)/g);

  return parts.map((part, i) => {
    if (/^https?:\/\//.test(part)) {
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400 underline hover:text-blue-300 break-all"
        >
          {part}
        </a>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

const WELCOME_MESSAGES: Omit<ChatMessage, 'id' | 'timestamp'>[] = [
  { content: 'Olá! 👋 Eu sou o Diobot, assistente virtual do Diogo.', isUser: false },
  { content: 'Pergunte-me qualquer coisa sobre o Diogo!', isUser: false },
];

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Tooltip: show after 3s, hide after 7s
  useEffect(() => {
    const showTimer = setTimeout(() => setShowTooltip(true), 3000);
    const hideTimer = setTimeout(() => setShowTooltip(false), 10000);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleChat = useCallback(() => {
    setIsOpen((prev) => {
      const opening = !prev;
      if (opening && messages.length === 0) {
        const now = Date.now();
        setMessages(
          WELCOME_MESSAGES.map((msg, i) => ({
            ...msg,
            id: `welcome-${i}-${now}`,
            timestamp: now + i,
          }))
        );
      }
      // Hide tooltip when opening
      if (opening) setShowTooltip(false);
      return opening;
    });
  }, [messages.length]);

  const sendMessage = useCallback(async () => {
    const text = inputValue.trim();
    if (!text || isTyping) return;

    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      content: text,
      isUser: true,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const res = await fetch(CHATBOT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error('Server error');

      const data: ChatbotResponse = await res.json();
      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        content: data.response,
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch {
      const errorMsg: ChatMessage = {
        id: `error-${Date.now()}`,
        content: '😔 Erro ao se conectar ao chatbot.',
        isUser: false,
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  }, [inputValue, isTyping]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button + tooltip */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
        {showTooltip && !isOpen && (
          <div className="bg-surface-light border border-border rounded-lg px-4 py-2 text-sm text-text-primary shadow-lg max-w-[260px] animate-fade-in">
            Olá! Veja por que você deve contratar o Diogo 😄
          </div>
        )}
        <button
          onClick={toggleChat}
          aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
          className="w-14 h-14 rounded-full bg-surface-light border border-border flex items-center justify-center shadow-lg hover:bg-surface transition-colors"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          )}
        </button>
      </div>

      {/* Chat window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 max-h-[500px] bg-surface border border-border rounded-xl shadow-lg flex flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border">
            <span className="text-text-primary font-semibold text-sm">Diobot</span>
            <button
              onClick={toggleChat}
              aria-label="Fechar chat"
              className="text-text-secondary hover:text-text-primary transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages area */}
          <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 min-h-[200px] max-h-[350px] chatbot-scroll">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] px-3 py-2 rounded-lg text-sm wrap-break-word ${
                    msg.isUser
                      ? 'bg-surface-light text-text-primary'
                      : 'text-text-secondary'
                  }`}
                >
                  {renderMessageContent(msg.content)}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="text-text-secondary text-sm px-3 py-2">
                  digitando<span className="animate-pulse">...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-border">
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Digite sua mensagem..."
              className="flex-1 bg-background border border-border rounded-lg px-3 py-2 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-text-secondary transition-colors"
            />
            <button
              onClick={sendMessage}
              disabled={!inputValue.trim() || isTyping}
              className="text-text-primary hover:text-text-secondary disabled:text-text-muted transition-colors text-sm font-medium px-2 py-2"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
