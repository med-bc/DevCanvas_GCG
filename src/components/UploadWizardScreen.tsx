import React, { useState } from 'react';
import { Folder, Link as LinkIcon, ArrowRight, ArrowLeft, Check, Sparkles, Plus, X, Rocket, Image as ImageIcon, Eye } from 'lucide-react';
import confetti from 'canvas-confetti';
import { Project, ActiveTab, UserProfile } from '../types';

interface UploadWizardScreenProps {
  user: UserProfile;
  onAddProject: (project: Project) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const UploadWizardScreen: React.FC<UploadWizardScreenProps> = ({
  user,
  onAddProject,
  setActiveTab,
}) => {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Form State matching screenshot
  const [repoName, setRepoName] = useState('devcanvas-ui-system');
  const [githubUrl, setGithubUrl] = useState('https://github.com/dev_architect/devcanvas-ui-system');
  const [shortDesc, setShortDesc] = useState('Colección de componentes reactivos con soporte para aceleración WebGL y telemetría de rendimiento.');
  const [techTags, setTechTags] = useState<string[]>(['React', 'TailwindCSS']);
  const [newTagInput, setNewTagInput] = useState('');

  // Step 2 Media & Extended fields
  const [version, setVersion] = useState('v1.0.0');
  const [category, setCategory] = useState<Project['category']>('UI');
  const [isAvailableForCollab, setIsAvailableForCollab] = useState(true);
  const [visibility, setVisibility] = useState<'public' | 'draft' | 'private'>('public');
  const [longDesc, setLongDesc] = useState(
    'DevCanvas UI System provides modular, zero-runtime-cost developer interface primitives crafted for data-intensive engineer dashboards and tools.'
  );

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTagInput.trim()) {
      e.preventDefault();
      const trimmed = newTagInput.trim();
      if (!techTags.includes(trimmed)) {
        setTechTags([...techTags, trimmed]);
      }
      setNewTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTechTags(techTags.filter((t) => t !== tagToRemove));
  };

  const handleFinalPublish = () => {
    const newProject: Project = {
      id: repoName.toLowerCase().replace(/[^a-z0-9]+/g, '-') || `project-${Date.now()}`,
      title: repoName || 'Untitled Project',
      version: version || 'v1.0.0',
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        isOnline: true,
      },
      description: shortDesc,
      longDescription: longDesc,
      tags: techTags.length > 0 ? techTags : ['React', 'TypeScript'],
      category: category,
      stars: 1,
      forks: 0,
      commits: 1,
      contributors: 1,
      views: 12,
      githubUrl: githubUrl,
      isAvailableForCollab: isAvailableForCollab,
      isPublic: visibility === 'public',
      isDraft: visibility === 'draft',
      isPrivate: visibility === 'private',
      updatedAt: 'Just now',
      readme: {
        lastUpdated: 'Just now',
        content: `# ${repoName}\n\n${shortDesc}\n\n## Quick Start\n\`\`\`bash\n$ git clone ${githubUrl}.git\n$ cd ${repoName}\n$ npm install\n$ npm run dev\n\`\`\``
      }
    };

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    onAddProject(newProject);
    setActiveTab('projects');
  };

  return (
    <div className="w-full flex flex-col items-center pb-28">
      {/* Top Header */}
      <div className="w-full max-w-xl px-4 pt-6 pb-2 text-center">
        <h1 className="text-2xl font-extrabold text-white tracking-tight">Upload Project</h1>
      </div>

      {/* Stepper Progress Bar: 1 Info, 2 Media, 3 Review */}
      <div className="w-full max-w-xl px-6 py-6">
        <div className="relative flex items-center justify-between">
          {/* Connector lines */}
          <div className="absolute left-8 right-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#1b253b] z-0" />
          <div
            className="absolute left-8 top-1/2 -translate-y-1/2 h-0.5 bg-[#3b82f6] transition-all duration-300 z-0"
            style={{
              width: currentStep === 1 ? '0%' : currentStep === 2 ? '50%' : '100%',
            }}
          />

          {/* Step 1 */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setCurrentStep(1)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                currentStep === 1
                  ? 'bg-[#93c5fd] text-[#0b101e] ring-4 ring-[#93c5fd]/20'
                  : currentStep > 1
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#131b2e] text-slate-400 border border-[#22304d]'
              }`}
            >
              {currentStep > 1 ? <Check className="w-4 h-4" /> : '1'}
            </button>
            <span
              className={`text-xs font-semibold mt-2 ${
                currentStep === 1 ? 'text-[#93c5fd]' : 'text-slate-400'
              }`}
            >
              Info
            </span>
          </div>

          {/* Step 2 */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setCurrentStep(2)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                currentStep === 2
                  ? 'bg-[#93c5fd] text-[#0b101e] ring-4 ring-[#93c5fd]/20'
                  : currentStep > 2
                  ? 'bg-[#10b981] text-white'
                  : 'bg-[#131b2e] text-slate-400 border border-[#22304d]'
              }`}
            >
              {currentStep > 2 ? <Check className="w-4 h-4" /> : '2'}
            </button>
            <span
              className={`text-xs font-semibold mt-2 ${
                currentStep === 2 ? 'text-[#93c5fd]' : 'text-slate-400'
              }`}
            >
              Media
            </span>
          </div>

          {/* Step 3 */}
          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={() => setCurrentStep(3)}
              className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-xs transition-all ${
                currentStep === 3
                  ? 'bg-[#93c5fd] text-[#0b101e] ring-4 ring-[#93c5fd]/20'
                  : 'bg-[#131b2e] text-slate-400 border border-[#22304d]'
              }`}
            >
              3
            </button>
            <span
              className={`text-xs font-semibold mt-2 ${
                currentStep === 3 ? 'text-[#93c5fd]' : 'text-slate-400'
              }`}
            >
              Review
            </span>
          </div>
        </div>
      </div>

      {/* Step Container Card */}
      <div className="w-full max-w-xl px-4">
        <div className="bg-[#131b2e] border border-[#22304d] rounded-2xl p-6 sm:p-7 shadow-xl">
          {/* STEP 1: INFO */}
          {currentStep === 1 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Detalles del Proyecto</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Ingresa la información básica para registrar tu repositorio.
                </p>
              </div>

              {/* Nombre del Repositorio */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Nombre del Repositorio <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center w-full bg-[#0e1424] border border-[#22304d] rounded-xl px-3.5 py-3 focus-within:border-[#3b82f6] transition-all">
                  <Folder className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="text"
                    value={repoName}
                    onChange={(e) => setRepoName(e.target.value)}
                    placeholder="ej. devcanvas-ui-system"
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* URL de GitHub */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  URL de GitHub <span className="text-rose-400">*</span>
                </label>
                <div className="flex items-center w-full bg-[#0e1424] border border-[#22304d] rounded-xl px-3.5 py-3 focus-within:border-[#3b82f6] transition-all">
                  <LinkIcon className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
                  <input
                    type="url"
                    value={githubUrl}
                    onChange={(e) => setGithubUrl(e.target.value)}
                    placeholder="https://github.com/usuario/repo"
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Descripción corta */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="text-xs font-semibold text-slate-300">
                    Descripción corta <span className="text-rose-400">*</span>
                  </label>
                </div>
                <div className="w-full bg-[#0e1424] border border-[#22304d] rounded-xl p-3 focus-within:border-[#3b82f6] transition-all">
                  <textarea
                    rows={3}
                    maxLength={120}
                    value={shortDesc}
                    onChange={(e) => setShortDesc(e.target.value)}
                    placeholder="Un breve resumen de lo que hace este proyecto..."
                    className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-500 focus:outline-none resize-none"
                  />
                  <div className="text-right text-[11px] text-slate-400 mt-1">
                    {shortDesc.length}/120 caracteres
                  </div>
                </div>
              </div>

              {/* Tech Stack (Etiquetas) */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Tech Stack (Etiquetas)
                </label>
                <div className="w-full bg-[#0e1424] border border-[#22304d] rounded-xl p-3 focus-within:border-[#3b82f6] transition-all">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    {techTags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-[#14233e] border border-[#2b4c80] text-xs font-medium text-[#93c5fd]"
                      >
                        <span>{tag}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="hover:text-white"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="Agrega tecnologías y presiona Enter"
                    className="w-full bg-transparent text-xs sm:text-sm text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Next Button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  disabled={!repoName.trim() || !shortDesc.trim()}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] disabled:opacity-50 text-[#0b101e] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Siguiente</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: MEDIA & DOCUMENTATION */}
          {currentStep === 2 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Media y Documentación</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Añade detalles extendidos, categoría y configuración de versión.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Versión
                  </label>
                  <input
                    type="text"
                    value={version}
                    onChange={(e) => setVersion(e.target.value)}
                    placeholder="v1.0.0"
                    className="w-full bg-[#0e1424] border border-[#22304d] rounded-xl px-3.5 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#3b82f6]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                    Categoría
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full bg-[#0e1424] border border-[#22304d] rounded-xl px-3 py-2.5 text-sm text-slate-100 focus:outline-none focus:border-[#3b82f6]"
                  >
                    <option value="UI">UI</option>
                    <option value="Machine Learning">Machine Learning</option>
                    <option value="Web">Web</option>
                    <option value="Backend">Backend</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Mobile">Mobile</option>
                    <option value="Serverless">Serverless</option>
                    <option value="DevOps">DevOps</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Descripción Detallada (About the project)
                </label>
                <textarea
                  rows={4}
                  value={longDesc}
                  onChange={(e) => setLongDesc(e.target.value)}
                  placeholder="Explica la arquitectura, características clave, e instrucciones de uso..."
                  className="w-full bg-[#0e1424] border border-[#22304d] rounded-xl p-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-[#3b82f6] resize-none"
                />
              </div>

              <div className="flex items-center justify-between p-3.5 bg-[#0e1424] rounded-xl border border-[#22304d]">
                <div>
                  <h4 className="text-xs font-bold text-white">Disponible para Collab</h4>
                  <p className="text-[11px] text-slate-400">Permitir que otros desarrolladores te contacten para colaborar</p>
                </div>
                <input
                  type="checkbox"
                  checked={isAvailableForCollab}
                  onChange={(e) => setIsAvailableForCollab(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-600 focus:ring-0 cursor-pointer"
                />
              </div>

              {/* Navigation buttons */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(1)}
                  className="w-1/3 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#0e1424] hover:bg-[#151e33] border border-[#22304d] text-slate-300 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
                <button
                  type="button"
                  onClick={() => setCurrentStep(3)}
                  className="w-2/3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] font-bold text-xs sm:text-sm shadow-md transition-all active:scale-[0.99] cursor-pointer"
                >
                  <span>Revisar Proyecto</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: REVIEW & PUBLISH */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div>
                <h2 className="text-xl font-bold text-white">Revisar y Publicar</h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Comprueba cómo se verá tu tarjeta en DevCanvas antes de publicarla.
                </p>
              </div>

              {/* Live Preview Card */}
              <div className="bg-[#0e1424] border border-[#2b3c61] rounded-xl p-4 shadow-inner">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{repoName}</h3>
                    <span className="px-2 py-0.5 text-[10px] font-mono text-slate-300 bg-[#1e293b] rounded">
                      {version}
                    </span>
                  </div>
                  {isAvailableForCollab && (
                    <span className="px-2 py-0.5 rounded-full bg-[#0d2822] text-[#34d399] text-[10px] font-medium border border-[#164e3f]">
                      • Collab
                    </span>
                  )}
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  {shortDesc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-2">
                  {techTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[11px] font-medium rounded bg-[#1a243b] text-slate-300 border border-[#293b61]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Visibility selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Estado de Visibilidad
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['public', 'draft', 'private'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setVisibility(v)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold capitalize border transition-all ${
                        visibility === v
                          ? 'bg-[#1e2a4a] text-[#93c5fd] border-[#3b82f6]'
                          : 'bg-[#0e1424] text-slate-400 border-[#22304d]'
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>

              {/* Final Publish Button */}
              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setCurrentStep(2)}
                  className="w-1/3 flex items-center justify-center gap-1.5 py-3 px-4 rounded-xl bg-[#0e1424] hover:bg-[#151e33] border border-[#22304d] text-slate-300 font-semibold text-xs transition-all"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Atrás</span>
                </button>
                <button
                  type="button"
                  onClick={handleFinalPublish}
                  className="w-2/3 flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#34d399] hover:bg-[#2ecc71] text-[#0b101e] font-bold text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.99] cursor-pointer"
                >
                  <Rocket className="w-4 h-4 text-[#0b101e]" />
                  <span>Publicar Proyecto</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
