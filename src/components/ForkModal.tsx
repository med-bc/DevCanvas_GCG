import React, { useState } from 'react';
import { X, GitFork, Copy, Check, Terminal, ExternalLink, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project } from '../types';

interface ForkModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: Project | null;
  onForkSuccess: (project: Project) => void;
}

export const ForkModal: React.FC<ForkModalProps> = ({
  isOpen,
  onClose,
  project,
  onForkSuccess,
}) => {
  const [copiedClone, setCopiedClone] = useState(false);
  const [forking, setForking] = useState(false);

  if (!isOpen || !project) return null;

  const cloneCommand = `git clone ${project.githubUrl}.git`;

  const handleCopy = () => {
    navigator.clipboard.writeText(cloneCommand);
    setCopiedClone(true);
    setTimeout(() => setCopiedClone(false), 2000);
  };

  const handleFork = () => {
    setForking(true);
    setTimeout(() => {
      setForking(false);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.7 }
      });
      onForkSuccess(project);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-[#0e1424] border border-[#22304d] rounded-2xl p-6 shadow-2xl overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1a233a] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Title */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-xl bg-[#16213b] border border-[#2e3e67] text-[#93c5fd]">
            <GitFork className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Clone or Fork Repository</h3>
            <p className="text-xs text-slate-400 font-mono">{project.title}</p>
          </div>
        </div>

        {/* Option 1: Fork to your DevCanvas Profile */}
        <div className="bg-[#131b2e] border border-[#22304d] rounded-xl p-4 mb-4">
          <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#93c5fd]" />
            <span>Fork to DevCanvas Workspace</span>
          </h4>
          <p className="text-xs text-slate-400 mb-3">
            Create an active copy in your Shared Projects to collaborate and experiment.
          </p>
          <button
            onClick={handleFork}
            disabled={forking}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] disabled:opacity-50 text-[#0b101e] font-bold text-xs shadow transition-all active:scale-[0.99] cursor-pointer"
          >
            <GitFork className="w-3.5 h-3.5 text-[#0b101e]" />
            <span>{forking ? 'Creating Fork...' : 'Fork Repository Now'}</span>
          </button>
        </div>

        {/* Option 2: Clone via Terminal */}
        <div className="bg-[#131b2e] border border-[#22304d] rounded-xl p-4 mb-4">
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-slate-400" />
              <span>Clone with HTTPS</span>
            </h4>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
            >
              {copiedClone ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400 text-[11px]">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span className="text-[11px]">Copy</span>
                </>
              )}
            </button>
          </div>

          <pre className="bg-[#090d18] border border-[#1b253b] rounded-lg p-2.5 font-mono text-xs text-slate-300 overflow-x-auto">
            {cloneCommand}
          </pre>
        </div>

        {/* GitHub link */}
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-1.5 text-xs text-[#93c5fd] hover:underline font-medium pt-1"
        >
          <span>Open on GitHub</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
