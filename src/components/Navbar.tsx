import React from 'react';
import { Terminal, Bell, Smartphone, Monitor, User, MessageSquare, LogIn } from 'lucide-react';
import { ActiveTab, UserProfile } from '../types';

interface NavbarProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
  user: UserProfile;
  isLoggedIn: boolean;
  onOpenAuth: () => void;
  isMobileFrame: boolean;
  setIsMobileFrame: (val: boolean) => void;
  unreadCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  user,
  isLoggedIn,
  onOpenAuth,
  isMobileFrame,
  setIsMobileFrame,
  unreadCount = 2,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0b101e]/90 backdrop-blur-md border-b border-[#1b253b] px-4 py-3">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        {/* Brand Logo */}
        <button
          onClick={() => setActiveTab('explore')}
          className="flex items-center gap-2 text-left group cursor-pointer focus:outline-none"
        >
          <div className="w-8 h-8 rounded-lg bg-[#16213b] border border-[#2e3e67] flex items-center justify-center text-[#93c5fd] group-hover:border-[#60a5fa] group-hover:bg-[#1d2b4d] transition-all">
            <Terminal className="w-4 h-4 text-[#93c5fd]" />
          </div>
          <span className="text-xl font-bold tracking-tight text-white group-hover:text-[#93c5fd] transition-colors">
            DevCanvas
          </span>
        </button>

        {/* Action Controls & Navigation */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Frame Mode Switcher (Mobile Device Frame vs Responsive Fullscreen) */}
          <button
            onClick={() => setIsMobileFrame(!isMobileFrame)}
            title={isMobileFrame ? "Switch to Full Desktop View" : "Switch to Mobile Device Mockup View"}
            className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium rounded-lg bg-[#141d33] hover:bg-[#1e2a4a] text-slate-300 border border-[#233152] transition-colors"
          >
            {isMobileFrame ? (
              <>
                <Monitor className="w-3.5 h-3.5 text-[#93c5fd]" />
                <span className="hidden sm:inline">Desktop View</span>
              </>
            ) : (
              <>
                <Smartphone className="w-3.5 h-3.5 text-[#93c5fd]" />
                <span className="hidden sm:inline">Mobile Frame</span>
              </>
            )}
          </button>

          {/* Contact History / Messages shortcut */}
          <button
            onClick={() => setActiveTab('contacts')}
            title="Contact History & Collaboration Chats"
            className={`relative p-2 rounded-lg transition-colors border ${
              activeTab === 'contacts'
                ? 'bg-[#1e2a4a] text-[#93c5fd] border-[#3b82f6]'
                : 'bg-[#141d33] hover:bg-[#1e2a4a] text-slate-300 border-[#233152]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#3b82f6] text-[10px] font-bold text-white rounded-full flex items-center justify-center ring-2 ring-[#0b101e]">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Auth Button or User Profile pill */}
          {isLoggedIn ? (
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#1b2746] border-[#3b82f6] text-white'
                  : 'bg-[#141d33] hover:bg-[#1e2a4a] border-[#233152] text-slate-200'
              }`}
            >
              <div className="relative">
                <img
                  src={user.avatar}
                  alt={user.name}
                  referrerPolicy="no-referrer"
                  className="w-7 h-7 rounded-full object-cover border border-[#38bdf8]"
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#10b981] ring-1 ring-[#0b101e]" />
              </div>
              <span className="text-xs font-semibold hidden sm:inline text-slate-200">
                @{user.username}
              </span>
            </button>
          ) : (
            <button
              onClick={onOpenAuth}
              className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-lg bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] shadow-sm transition-all active:scale-95"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Join</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
