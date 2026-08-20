import React from 'react';
import { MessageSquare, Clock, Users, ExternalLink, Send, ArrowRight, User } from 'lucide-react';
import { ContactMessage, ActiveTab, Project } from '../types';

interface ContactHistoryScreenProps {
  messages: ContactMessage[];
  onOpenChat: (msg: ContactMessage) => void;
  onSelectProjectById: (projectId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ContactHistoryScreen: React.FC<ContactHistoryScreenProps> = ({
  messages,
  onOpenChat,
  onSelectProjectById,
  setActiveTab,
}) => {
  const getStatusBadge = (status: ContactMessage['status'], timeAgo: string) => {
    switch (status) {
      case 'replied':
        return (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d2822] border border-[#164e3f] text-[#34d399] text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] glow-emerald" />
              <span>Replied</span>
            </span>
            <span className="text-xs text-slate-400">{timeAgo}</span>
          </div>
        );
      case 'sent':
        return (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1e2a4a] border border-[#2b3d6b] text-slate-300 text-xs font-semibold">
              <Clock className="w-3 h-3 text-slate-400" />
              <span>Sent</span>
            </span>
            <span className="text-xs text-slate-400">{timeAgo}</span>
          </div>
        );
      case 'collaborating':
        return (
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#20183b] border border-[#48287d] text-[#c084fc] text-xs font-semibold">
              <Users className="w-3 h-3 text-[#c084fc]" />
              <span>Collaborating</span>
            </span>
            <span className="text-xs text-slate-400">{timeAgo}</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-28">
      {/* Header */}
      <div className="w-full max-w-xl px-4 pt-6 pb-4">
        <h1 className="text-3xl font-extrabold text-[#dbeafe] tracking-tight">
          Contact History
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Review projects you&apos;ve expressed interest in collaborating on.
        </p>
      </div>

      {/* Messages List */}
      <div className="w-full max-w-xl px-4 flex flex-col gap-4 mt-2">
        {messages.length === 0 ? (
          <div className="bg-[#131b2e] border border-[#22304d] rounded-2xl p-8 text-center text-slate-400">
            <MessageSquare className="w-8 h-8 mx-auto mb-3 text-slate-500" />
            <p className="text-sm font-semibold text-slate-200">No contact history yet</p>
            <p className="text-xs text-slate-400 mt-1">
              Explore repositories and click &quot;Contactar Creador&quot; to pitch ideas or collaborate!
            </p>
            <button
              onClick={() => setActiveTab('explore')}
              className="mt-4 px-4 py-2 rounded-lg bg-[#1e2a4a] text-[#93c5fd] text-xs font-medium border border-[#3b82f6]/40"
            >
              Explore Repositories
            </button>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className="bg-[#131b2e] border border-[#22304d] rounded-2xl p-5 shadow-lg flex flex-col gap-3"
            >
              {/* Status Header */}
              <div>{getStatusBadge(msg.status, msg.timeAgo)}</div>

              {/* Project Title */}
              <h3 className="text-lg font-bold text-white tracking-tight">
                {msg.projectTitle}
              </h3>

              {/* Creator info */}
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Created by</span>
                <span className="text-[#93c5fd] font-medium font-mono">
                  @{msg.creatorUsername}
                </span>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 my-1">
                {msg.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#1a243b] text-slate-300 border border-[#293b61]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Actions row */}
              <div className="pt-2">
                {msg.status === 'replied' && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={() => onOpenChat(msg)}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] font-bold text-xs shadow transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-[#0b101e]" />
                      <span>Continue Chat</span>
                    </button>

                    <button
                      onClick={() => onSelectProjectById(msg.projectId)}
                      className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#131b2e] hover:bg-[#1a243b] border border-[#22304d] text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                    >
                      <span>View Project</span>
                    </button>
                  </div>
                )}

                {msg.status === 'sent' && (
                  <button
                    onClick={() => onOpenChat(msg)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#131b2e] hover:bg-[#1a243b] border border-[#22304d] text-slate-300 font-semibold text-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5 text-slate-400" />
                    <span>Message Again</span>
                  </button>
                )}

                {msg.status === 'collaborating' && (
                  <button
                    onClick={() => onOpenChat(msg)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] font-bold text-xs shadow transition-all active:scale-[0.99] cursor-pointer"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-[#0b101e]" />
                    <span>Open Workspace</span>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
