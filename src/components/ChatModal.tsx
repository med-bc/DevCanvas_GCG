import React, { useState } from 'react';
import { X, Send, User, Sparkles, Check, MessageSquare } from 'lucide-react';
import { ContactMessage, Project } from '../types';

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
  contactMessage: ContactMessage | null;
  targetProject?: Project | null;
  onSendMessage: (projectId: string, projectTitle: string, creatorName: string, creatorUsername: string, text: string) => void;
}

export const ChatModal: React.FC<ChatModalProps> = ({
  isOpen,
  onClose,
  contactMessage,
  targetProject,
  onSendMessage,
}) => {
  const [inputText, setInputText] = useState('');

  if (!isOpen) return null;

  const projectTitle = contactMessage?.projectTitle || targetProject?.title || 'Project Discussion';
  const creatorName = contactMessage?.creatorName || targetProject?.author.name || 'Creator';
  const creatorUsername = contactMessage?.creatorUsername || targetProject?.author.username || 'creator';
  const creatorAvatar = contactMessage?.creatorAvatar || targetProject?.author.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80';
  const chatHistory = contactMessage?.chatHistory || [];

  const quickPitches = [
    'I would love to contribute to this repo!',
    'Can I help optimize the architecture or docs?',
    'Awesome concept! Are you open to backend collaboration?',
  ];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    onSendMessage(
      contactMessage?.projectId || targetProject?.id || 'new-pitch',
      projectTitle,
      creatorName,
      creatorUsername,
      inputText.trim()
    );
    setInputText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-[#0e1424] border border-[#22304d] rounded-2xl flex flex-col h-[600px] max-h-[90vh] shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 bg-[#131b2e] border-b border-[#22304d] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img
                src={creatorAvatar}
                alt={creatorName}
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full object-cover border border-[#3b82f6]"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-[#10b981] glow-emerald ring-2 ring-[#131b2e]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-white">{creatorName}</h3>
                <span className="text-xs font-mono text-[#93c5fd]">@{creatorUsername}</span>
              </div>
              <p className="text-xs text-slate-400 truncate max-w-[240px]">
                Re: <span className="text-slate-200 font-medium">{projectTitle}</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a233a] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Message Thread Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#0a0e19]">
          {chatHistory.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <MessageSquare className="w-10 h-10 text-[#3b82f6]/60 mb-3" />
              <h4 className="text-sm font-bold text-white mb-1">Direct Developer Pitch</h4>
              <p className="text-xs text-slate-400 max-w-xs mb-4">
                Reach out directly to @{creatorUsername} about <span className="text-[#93c5fd]">{projectTitle}</span>.
              </p>

              {/* Quick suggestions */}
              <div className="space-y-1.5 w-full max-w-sm">
                <p className="text-[11px] text-slate-500 font-mono uppercase text-left">Quick templates:</p>
                {quickPitches.map((pitch, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInputText(pitch)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-[#131b2e] hover:bg-[#19243d] border border-[#22304d] text-slate-300 transition-colors"
                  >
                    &ldquo;{pitch}&rdquo;
                  </button>
                ))}
              </div>
            </div>
          ) : (
            chatHistory.map((chat) => (
              <div
                key={chat.id}
                className={`flex flex-col ${
                  chat.sender === 'user' ? 'items-end' : 'items-start'
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-3.5 text-xs sm:text-sm leading-relaxed shadow ${
                    chat.sender === 'user'
                      ? 'bg-[#2563eb] text-white rounded-br-none'
                      : 'bg-[#131b2e] border border-[#22304d] text-slate-200 rounded-bl-none'
                  }`}
                >
                  <p>{chat.text}</p>
                </div>
                <span className="text-[10px] text-slate-500 mt-1 px-1">{chat.timestamp}</span>
              </div>
            ))
          )}
        </div>

        {/* Input Composer */}
        <form onSubmit={handleSend} className="p-3 bg-[#131b2e] border-t border-[#22304d] flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={`Message @${creatorUsername}...`}
            className="flex-1 bg-[#0a0e19] border border-[#22304d] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3b82f6]"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] disabled:opacity-40 text-[#0b101e] font-bold shadow transition-colors cursor-pointer"
          >
            <Send className="w-4 h-4 text-[#0b101e]" />
          </button>
        </form>
      </div>
    </div>
  );
};
