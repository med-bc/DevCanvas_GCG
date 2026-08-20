import React from 'react';
import { Globe, FileText, Edit2, BarChart2, Trash2, Plus, Eye, Star, Lock } from 'lucide-react';
import { Project, ActiveTab } from '../types';

interface MyProjectsScreenProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onEditProject: (project: Project) => void;
  onDeleteProject: (projectId: string) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const MyProjectsScreen: React.FC<MyProjectsScreenProps> = ({
  projects,
  onSelectProject,
  onEditProject,
  onDeleteProject,
  setActiveTab,
}) => {
  // Filter for user's owned projects (e.g. author is dev_architect or public/draft user projects)
  const myProjects = projects.filter(
    (p) =>
      p.author.username === 'dev_architect' ||
      p.id.startsWith('nexus') ||
      p.id.startsWith('auth') ||
      p.id.startsWith('react-cyber') ||
      p.id.startsWith('quantum') ||
      p.id.startsWith('neuralnet')
  );

  return (
    <div className="w-full flex flex-col items-center pb-28 relative min-h-[85vh]">
      {/* Header */}
      <div className="w-full max-w-xl px-4 pt-6 pb-4">
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          My Shared Projects
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Manage and monitor the performance of your public and draft repositories.
        </p>
      </div>

      {/* Projects List */}
      <div className="w-full max-w-xl px-4 flex flex-col gap-4 mt-2">
        {myProjects.map((project) => (
          <div
            key={project.id}
            onClick={() => onSelectProject(project)}
            className="group bg-[#131b2e] hover:bg-[#162038] border border-[#22304d] hover:border-[#3b82f6]/50 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer"
          >
            {/* Status pill & Actions */}
            <div className="flex items-center justify-between mb-3">
              {project.isDraft ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#1b2338] border border-[#2e3d5e] text-slate-400 text-xs font-semibold">
                  <FileText className="w-3.5 h-3.5" />
                  <span>Draft</span>
                </span>
              ) : project.isPrivate ? (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#2a1d33] border border-[#522e6b] text-purple-300 text-xs font-semibold">
                  <Lock className="w-3.5 h-3.5" />
                  <span>Private</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#0d2822] border border-[#164e3f] text-[#34d399] text-xs font-semibold">
                  <Globe className="w-3.5 h-3.5 text-[#34d399]" />
                  <span>Public</span>
                </span>
              )}

              {/* Action Icons */}
              <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                <button
                  onClick={() => onEditProject(project)}
                  title="Edit Project"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f2b48] transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                </button>

                {!project.isDraft && (
                  <button
                    onClick={() =>
                      alert(`Analytics for ${project.title}:\n• Total Views: ${project.views || 1200}\n• Total Stars: ${project.stars}\n• Clone Traffic: 84 clones/week`)
                    }
                    title="View Analytics"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-[#1f2b48] transition-colors"
                  >
                    <BarChart2 className="w-4 h-4" />
                  </button>
                )}

                <button
                  onClick={() => {
                    if (confirm(`Are you sure you want to delete "${project.title}"?`)) {
                      onDeleteProject(project.id);
                    }
                  }}
                  title="Delete Project"
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-[#2d1822] transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Title */}
            <h3 className="text-lg font-bold text-white group-hover:text-[#93c5fd] transition-colors mb-1.5">
              {project.title}
            </h3>

            {/* Description */}
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
              {project.description}
            </p>

            {/* Tech Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-[#1a243b] text-slate-300 border border-[#293b61]"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer Stats or Draft info */}
            <div className="pt-3 border-t border-[#1e2b48] flex items-center justify-between text-xs text-slate-400">
              {project.isDraft ? (
                <span className="text-[11px] text-slate-400">{project.updatedAt}</span>
              ) : (
                <div className="flex items-center gap-5">
                  <div className="flex items-center gap-1.5">
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {project.views && project.views >= 1000
                        ? `${(project.views / 1000).toFixed(1)}k`
                        : project.views || 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-slate-400" />
                    <span>
                      {project.stars >= 1000
                        ? `${(project.stars / 1000).toFixed(1)}k`
                        : project.stars}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Floating Action Button (FAB) at bottom right */}
      <div className="fixed bottom-20 right-6 sm:right-10 z-30">
        <button
          onClick={() => setActiveTab('upload')}
          title="Upload New Project"
          className="w-14 h-14 rounded-2xl bg-[#9bb6fb] hover:bg-[#b2c8fc] text-[#0b101e] shadow-xl flex items-center justify-center transition-transform hover:scale-105 active:scale-95 cursor-pointer"
        >
          <Plus className="w-7 h-7 stroke-[2.5]" />
        </button>
      </div>
    </div>
  );
};
