import React, { useState } from 'react';
import { ArrowLeft, GitFork, Mail, Star, Copy, Check, Info, BarChart2, Cpu, FileText, Share2 } from 'lucide-react';
import { Project, ActiveTab } from '../types';

interface ProjectDetailScreenProps {
  project: Project;
  onBack: () => void;
  onOpenContact: (project: Project) => void;
  onOpenForkModal: (project: Project) => void;
  onToggleStar: (projectId: string, e: React.MouseEvent) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProjectDetailScreen: React.FC<ProjectDetailScreenProps> = ({
  project,
  onBack,
  onOpenContact,
  onOpenForkModal,
  onToggleStar,
  setActiveTab,
}) => {
  const [copiedInstall, setCopiedInstall] = useState(false);
  const [copiedShare, setCopiedShare] = useState(false);

  const installCommand = `$ git clone ${project.githubUrl}.git\n$ cd ${project.id}\n$ pip install -r requirements.txt\n$ python setup.py install`;

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedInstall(true);
    setTimeout(() => setCopiedInstall(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2000);
  };

  // Color mappings for specific tags matching the screenshots
  const getTagStyle = (tag: string) => {
    switch (tag.toLowerCase()) {
      case 'aws sagemaker':
        return 'bg-[#291e12] border-[#78350f] text-[#fbbf24]';
      case 'tensorflow':
        return 'bg-[#2b1812] border-[#831843] text-[#f97316]';
      case 'docker':
        return 'bg-[#0e2439] border-[#0284c7] text-[#38bdf8]';
      case 'git':
        return 'bg-[#291414] border-[#991b1b] text-[#f87171]';
      case 'geopandas':
        return 'bg-[#0f2824] border-[#0f766e] text-[#2dd4bf]';
      case 'python':
        return 'bg-[#12233b] border-[#1d4ed8] text-[#60a5fa]';
      default:
        return 'bg-[#1a243b] border-[#293b61] text-slate-300';
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-28">
      {/* Top action header */}
      <div className="w-full max-w-xl px-4 pt-4 flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors p-2 -ml-2 rounded-lg hover:bg-[#131b2e]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Volver</span>
        </button>

        <button
          onClick={handleShare}
          className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-200 px-3 py-1.5 rounded-lg bg-[#131b2e] border border-[#22304d] transition-colors"
        >
          {copiedShare ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400">Enlace copiado</span>
            </>
          ) : (
            <>
              <Share2 className="w-3.5 h-3.5" />
              <span>Compartir</span>
            </>
          )}
        </button>
      </div>

      <div className="w-full max-w-xl px-4 pt-4">
        {/* Project Title & Version */}
        <div className="flex items-center gap-3 flex-wrap mb-2">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#93c5fd] tracking-tight">
            {project.title}
          </h1>
          {project.version && (
            <span className="px-2.5 py-0.5 text-xs font-mono text-slate-300 bg-[#1e293b] rounded border border-[#334155]">
              {project.version}
            </span>
          )}
        </div>

        {/* Author information with online indicator */}
        <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-400 mb-6">
          <span>Created by</span>
          <span className="text-[#93c5fd] font-medium hover:underline cursor-pointer">
            {project.author.name}
          </span>
          {project.author.isOnline && (
            <span className="w-2 h-2 rounded-full bg-[#10b981] glow-emerald inline-block" />
          )}
        </div>

        {/* Dual Primary Action Buttons: Clone / Fork and Contact */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => onOpenForkModal(project)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <GitFork className="w-4 h-4 text-[#0b101e]" />
            <span>Clone / Fork</span>
          </button>

          <button
            onClick={() => onOpenContact(project)}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#131b2e] hover:bg-[#1b2640] border border-[#233152] text-slate-200 font-semibold text-xs sm:text-sm shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <Mail className="w-4 h-4 text-[#93c5fd]" />
            <span>Contact</span>
          </button>
        </div>

        <div className="w-full h-px bg-[#1b253b] mb-8" />

        {/* Section 1: About the Project */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#93c5fd] font-bold text-base mb-3">
            <Info className="w-4 h-4" />
            <span>About the Project</span>
          </div>
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
            <p>
              {project.longDescription || project.description}
            </p>
          </div>
        </div>

        {/* Section 2: Repository Stats (4 Grid Cards) */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#93c5fd] font-bold text-base mb-3">
            <BarChart2 className="w-4 h-4" />
            <span>Repository Stats</span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {/* Stars */}
            <div
              onClick={(e) => onToggleStar(project.id, e)}
              className="bg-[#131b2e] border border-[#22304d] hover:border-amber-400/50 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer transition-all"
            >
              <span className="text-2xl font-extrabold text-[#93c5fd] flex items-center gap-1.5">
                {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                {project.isStarred && <Star className="w-4 h-4 fill-amber-400 text-amber-400" />}
              </span>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                STARS
              </span>
            </div>

            {/* Forks */}
            <div className="bg-[#131b2e] border border-[#22304d] rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-[#34d399]">
                {project.forks}
              </span>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                FORKS
              </span>
            </div>

            {/* Commits */}
            <div className="bg-[#131b2e] border border-[#22304d] rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-[#fbbf24]">
                {project.commits || 89}
              </span>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                COMMITS
              </span>
            </div>

            {/* Contributors */}
            <div className="bg-[#131b2e] border border-[#22304d] rounded-xl p-4 flex flex-col items-center justify-center">
              <span className="text-2xl font-extrabold text-[#c084fc]">
                {project.contributors || 12}
              </span>
              <span className="text-[11px] font-bold tracking-wider text-slate-400 uppercase mt-1">
                CONTRIBUTORS
              </span>
            </div>
          </div>
        </div>

        {/* Section 3: Tech Stack */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-[#93c5fd] font-bold text-base mb-3">
            <Cpu className="w-4 h-4" />
            <span>Tech Stack</span>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border ${getTagStyle(tag)}`}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Section 4: README.md */}
        <div className="mb-8">
          <div className="bg-[#131b2e] border border-[#22304d] rounded-t-xl px-4 py-2.5 flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-2 font-mono font-medium text-slate-300">
              <FileText className="w-3.5 h-3.5 text-[#93c5fd]" />
              <span>README . md</span>
            </div>
            <span>Last updated {project.readme?.lastUpdated || '2 days ago'}</span>
          </div>

          <div className="bg-[#0e1424] border-x border-b border-[#22304d] rounded-b-xl p-5 space-y-6 text-xs sm:text-sm text-slate-300">
            {/* Title & overview */}
            <div>
              <h2 className="text-xl font-bold text-white mb-2">{project.title}</h2>
              <p className="text-slate-400 leading-relaxed">
                A scalable pipeline for satellite image analysis focusing on environmental conservation.
              </p>
            </div>

            {/* Installation */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-base font-bold text-white">Installation</h3>
                <button
                  onClick={() => copyToClipboard(installCommand)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white transition-colors"
                >
                  {copiedInstall ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400">Copiado</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copiar</span>
                    </>
                  )}
                </button>
              </div>

              <pre className="bg-[#090d18] border border-[#1b253b] rounded-lg p-3 font-mono text-xs text-slate-300 overflow-x-auto whitespace-pre-wrap leading-relaxed">
                {installCommand}
              </pre>
            </div>

            {/* Quick Start */}
            <div>
              <h3 className="text-base font-bold text-white mb-2">Quick Start</h3>
              <pre className="bg-[#090d18] border border-[#1b253b] rounded-lg p-3 font-mono text-xs text-[#93c5fd] overflow-x-auto leading-relaxed">
                {`import ecotracker as et\n\n# Load sample satellite data dataset\ndataset = et.load_dataset('amazon_basin_2024')\n\n# Run inference model\nmodel = et.models.DeforestationPredictor()\nresults = model.predict(dataset)\n\n# Generate heat map\nresults.plot_risk_map(output='risk_analysis.png')`}
              </pre>
            </div>

            {/* Contributing */}
            <div>
              <h3 className="text-base font-bold text-white mb-2">Contributing</h3>
              <p className="text-slate-400 leading-relaxed">
                We welcome contributions! Please review our CONTRIBUTING.md guidelines before submitting a pull request. Ensure all tests pass by running pytest locally.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="w-full text-xs text-slate-400 border-t border-[#1b253b] pt-8 space-y-4">
          <div>
            <span className="font-bold tracking-wider text-slate-200 uppercase text-[11px]">DEVCANVAS</span>
            <p className="text-slate-400 mt-1">
              © 2024 DevCanvas. <span className="text-[#34d399]">Built for the modern engineer.</span>
            </p>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-300">
            <button onClick={() => setActiveTab('explore')} className="hover:text-white transition-colors">
              Explore
            </button>
            <button onClick={() => setActiveTab('search')} className="hover:text-white transition-colors">
              Repositories
            </button>
            <button onClick={() => alert("Documentation")} className="hover:text-white transition-colors">
              Documentation
            </button>
          </div>

          <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400">
            <button onClick={() => alert("Privacy Policy")} className="hover:text-slate-200 transition-colors">
              Privacy Policy
            </button>
            <button onClick={() => alert("Terms of Service")} className="hover:text-slate-200 transition-colors">
              Terms of Service
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
};
