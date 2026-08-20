import React, { useState } from 'react';
import { Search, Star, GitFork, Mail, ArrowRight, Rocket, Terminal, CheckCircle2, Heart } from 'lucide-react';
import { Project, ActiveTab } from '../types';

interface HomeScreenProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onOpenContact: (project: Project) => void;
  onToggleStar: (projectId: string, e: React.MouseEvent) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onSearch: (query: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  projects,
  onSelectProject,
  onOpenContact,
  onToggleStar,
  setActiveTab,
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [terminalStep, setTerminalStep] = useState(0);

  const featuredProjects = projects.filter(
    (p) => p.id === 'ecotracker-ai' || p.id === 'neondb-wrapper' || p.id === 'react-glitch-ui'
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    } else {
      setActiveTab('search');
    }
  };

  return (
    <div className="w-full flex flex-col items-center pb-24">
      {/* Hero Section */}
      <div className="w-full max-w-xl px-4 pt-8 pb-6 flex flex-col items-center text-center">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#112035] border border-[#1e3a5f] text-[#34d399] text-xs font-mono font-medium mb-6 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-[#10b981] glow-emerald" />
          <span className="tracking-wider uppercase text-[11px] font-semibold">SISTEMA ONLINE</span>
        </div>

        {/* Hero Title */}
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight mb-4">
          Construye. Comparte. <br />
          <span className="text-[#93c5fd]">Colabora.</span>
        </h1>

        {/* Hero Description */}
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mb-8 font-normal">
          La plataforma para descubrir y escalar proyectos tecnológicos de la comunidad. Conecta con otros desarrolladores, explora repositorios innovadores y lleva tus ideas al siguiente nivel.
        </p>

        {/* Search Input Bar */}
        <form onSubmit={handleSearchSubmit} className="w-full relative mb-10">
          <div className="flex items-center w-full bg-[#12192a] border border-[#233152] rounded-xl px-3.5 py-2.5 shadow-lg focus-within:border-[#3b82f6] transition-all">
            <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar repositorios, lenguajes..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            <button
              type="submit"
              className="ml-2 px-4 py-1.5 rounded-lg bg-[#3b82f6] hover:bg-[#2563eb] text-white text-xs font-semibold tracking-wide shadow transition-colors shrink-0"
            >
              Buscar
            </button>
          </div>
        </form>
      </div>

      {/* Featured Projects Section */}
      <div className="w-full max-w-xl px-4 mb-12">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-white tracking-tight">Proyectos Destacados</h2>
          <button
            onClick={() => setActiveTab('search')}
            className="flex items-center gap-1.5 text-xs font-semibold text-[#93c5fd] hover:text-[#bfdbfe] transition-colors"
          >
            <span>Ver todos</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Project Cards List */}
        <div className="flex flex-col gap-4">
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative bg-[#131b2e] hover:bg-[#162038] border border-[#22304d] hover:border-[#3b82f6]/60 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer"
            >
              {/* Header with Title & Badges */}
              <div className="flex items-start justify-between gap-3 mb-2.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="text-lg font-bold text-white group-hover:text-[#93c5fd] transition-colors">
                    {project.title}
                  </h3>
                  {project.version && (
                    <span className="px-2 py-0.5 text-[11px] font-mono text-slate-300 bg-[#1e293b] rounded border border-[#334155]">
                      {project.version}
                    </span>
                  )}
                </div>

                {project.isAvailableForCollab && (
                  <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d2822] border border-[#164e3f] text-[#34d399] text-[11px] font-medium shrink-0">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] glow-emerald" />
                    <span>Disponible para Collab</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                {project.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#1a243b] text-slate-300 border border-[#293b61]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Card Footer with Stats & Contact CTA */}
              <div className="flex items-center justify-between pt-3 border-t border-[#1e2b48] text-xs text-slate-400">
                <div className="flex items-center gap-4">
                  <button
                    onClick={(e) => onToggleStar(project.id, e)}
                    className={`flex items-center gap-1.5 hover:text-amber-300 transition-colors ${
                      project.isStarred ? 'text-amber-400 font-semibold' : ''
                    }`}
                  >
                    <Star
                      className={`w-4 h-4 ${
                        project.isStarred ? 'fill-amber-400 text-amber-400' : ''
                      }`}
                    />
                    <span>
                      {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                    </span>
                  </button>

                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>{project.forks}</span>
                  </div>
                </div>

                {/* Contact Creator Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenContact(project);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c2744] hover:bg-[#25355e] text-slate-200 border border-[#2c3d66] hover:border-[#425a94] text-xs font-medium transition-all"
                >
                  <Mail className="w-3.5 h-3.5 text-[#93c5fd]" />
                  <span>Contactar Creador</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Idea / CTA Card Section */}
      <div className="w-full max-w-xl px-4 mb-16">
        <div className="bg-[#141c30] border border-[#233152] rounded-2xl p-6 shadow-xl relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute -top-12 -right-12 w-48 h-48 bg-[#3b82f6]/10 rounded-full blur-2xl pointer-events-none" />

          <h3 className="text-xl font-bold text-white mb-2">¿Tienes una idea en desarrollo?</h3>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
            Muestra tu código al mundo, recibe feedback de desarrolladores senior y encuentra colaboradores para llevar tu proyecto a producción.
          </p>

          <button
            onClick={() => setActiveTab('upload')}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] font-bold text-sm shadow-md transition-all active:scale-[0.99] mb-6 cursor-pointer"
          >
            <Rocket className="w-4 h-4 text-[#0b101e]" />
            <span>Subir tu Proyecto</span>
          </button>

          {/* Interactive Terminal Mockup */}
          <div className="w-full bg-[#0a0e19] border border-[#1b253b] rounded-xl p-4 font-mono text-xs text-slate-300 shadow-inner">
            <div className="flex items-center gap-1.5 mb-3">
              <div className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
            </div>
            <div className="space-y-1 text-slate-400">
              <p className="text-slate-300">&gt; git add .</p>
              <p className="text-slate-300">&gt; git commit -m &quot;Init&quot;</p>
              <p className="text-slate-300">&gt; git push origin main</p>
              <p className="text-[#93c5fd] pt-1">Deploying...</p>
              <div className="flex items-center gap-2 text-emerald-400 font-bold">
                <span>[======    ] 60%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full max-w-xl px-4 text-xs text-slate-400 border-t border-[#1b253b] pt-8 space-y-4">
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
          <button onClick={() => alert("Documentation: DevCanvas provides instant showcase, fork, and developer connection utilities.")} className="hover:text-white transition-colors">
            Documentation
          </button>
        </div>

        <div className="flex flex-wrap gap-x-6 gap-y-2 text-slate-400">
          <button onClick={() => alert("Privacy Policy: DevCanvas respects your code privacy and handles zero unauthorized tracking.")} className="hover:text-slate-200 transition-colors">
            Privacy Policy
          </button>
          <button onClick={() => alert("Terms of Service: Community-first open source engineering guidelines.")} className="hover:text-slate-200 transition-colors">
            Terms of Service
          </button>
        </div>
      </footer>
    </div>
  );
};
