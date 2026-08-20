import React, { useState } from 'react';
import { X, User, Briefcase, FileText, Check } from 'lucide-react';
import { UserProfile } from '../types';

interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onSaveProfile: (updated: UserProfile) => void;
}

export const EditProfileModal: React.FC<EditProfileModalProps> = ({
  isOpen,
  onClose,
  user,
  onSaveProfile,
}) => {
  const [name, setName] = useState(user.name);
  const [username, setUsername] = useState(user.username);
  const [role, setRole] = useState(user.role);
  const [bio, setBio] = useState(user.bio);
  const [avatar, setAvatar] = useState(user.avatar);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      ...user,
      name,
      username,
      role,
      bio,
      avatar,
    });
    onClose();
  };

  const sampleAvatars = [
    'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e1424] border border-[#22304d] rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a233a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-white mb-4">Edit Profile</h3>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Avatar picker */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">Avatar</label>
            <div className="flex items-center gap-3">
              {sampleAvatars.map((url, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setAvatar(url)}
                  className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                    avatar === url ? 'border-[#3b82f6] ring-2 ring-blue-500/30 scale-105' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={url} alt="avatar option" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Display Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#131b2e] border border-[#22304d] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#3b82f6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Username Handle</label>
            <div className="flex items-center bg-[#131b2e] border border-[#22304d] rounded-xl px-3.5 py-2.5 focus-within:border-[#3b82f6]">
              <span className="text-slate-400 text-xs font-mono mr-1.5">@</span>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-100 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Role / Headline</label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#131b2e] border border-[#22304d] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#3b82f6]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">Bio</label>
            <textarea
              rows={3}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full bg-[#131b2e] border border-[#22304d] rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-[#3b82f6] resize-none"
            />
          </div>

          <div className="pt-2 flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="w-1/3 py-2.5 px-4 rounded-xl bg-[#131b2e] border border-[#22304d] text-slate-300 text-xs font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-2/3 flex items-center justify-center gap-1.5 py-2.5 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] text-xs font-bold shadow"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
