import React, { useState } from 'react';
import { Edit3, Globe, Lock, Star, GitFork, GitCommit, GitPullRequest, Award, ExternalLink, Github } from 'lucide-react';
import { Project, UserProfile, ActiveTab } from '../types';

interface ProfileScreenProps {
  user: UserProfile;
  projects: Project[];
  onSelectProject: (project: Project) => void;
  onEditProfile: () => void;
  onToggleStar: (projectId: string, e: React.MouseEvent) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  user,
  projects,
  onSelectProject,
  onEditProfile,
  onToggleStar,
  setActiveTab,
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'projects' | 'activity'>('projects');

  // Filter projects authored by this user
  const userProjects = projects.filter(
    (p) => p.author.username === user.username || p.id.startsWith('quantum') || p.id.startsWith('nexus') || p.id.startsWith('neuralnet') || p.id.startsWith('auth') || p.id.startsWith('react-cyber')
  );

  const activities = [
    {
      id: 'act-1',
      type: 'commit',
      title: 'Pushed 4 commits to quantum-api-gateway',
      time: '2 hours ago',
      detail: 'Add token bucket rate limiter and distributed telemetry hooks',
      icon: GitCommit,
      color: 'text-emerald-400',
    },
    {
      id: 'act-2',
      type: 'collab',
      title: 'Accepted collaboration invite from @systems_guru',
      time: '2 days ago',
      detail: 'Joined Distributed Key-Value Store in Rust project as core maintainer',
      icon: GitPullRequest,
      color: 'text-[#93c5fd]',
    },
    {
      id: 'act-3',
      type: 'star',
      title: 'Starred EcoTracker AI by @elena_rodriguez',
      time: '3 days ago',
      detail: 'A scalable pipeline for satellite image analysis focusing on conservation',
      icon: Star,
      color: 'text-amber-400',
    },
    {
      id: 'act-4',
      type: 'release',
      title: 'Released NexusUI v1.4.0',
      time: '4 days ago',
      detail: 'Published React WebGL shaders component package',
      icon: Award,
      color: 'text-purple-400',
    },
  ];

  return (
    <div className="w-full flex flex-col items-center pb-24">
      {/* Profile Header Box */}
      <div className="w-full max-w-xl px-4 pt-6 pb-6">
        <div className="bg-[#131b2e] border border-[#22304d] rounded-2xl p-6 shadow-xl flex flex-col items-center text-center">
          {/* Cyberpunk Avatar with glow border and online indicator */}
          <div className="relative mb-4">
            <div className="w-24 h-24 rounded-2xl overflow-hidden p-1 bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/20">
              <img
                src={user.avatar}
                alt={user.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <span className="absolute bottom-1 right-1 w-4 h-4 rounded-full bg-[#10b981] ring-3 ring-[#131b2e] glow-emerald" />
          </div>

          {/* User Handle & Role */}
          <h2 className="text-xl font-bold text-white tracking-tight">@{user.username}</h2>
          <p className="text-sm text-slate-300 font-medium mt-0.5">{user.role}</p>

          {/* Stats Bar */}
          <div className="flex items-center justify-center gap-6 my-6 w-full py-3 px-4 bg-[#0e1424] rounded-xl border border-[#1b253b]">
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-white">{user.projectsCount}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Projects</span>
            </div>
            <div className="w-px h-8 bg-[#1e2a4a]" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-white">
                {user.contributionsCount >= 1000 ? `${(user.contributionsCount / 1000).toFixed(1)}k` : user.contributionsCount}
              </span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Contributions</span>
            </div>
            <div className="w-px h-8 bg-[#1e2a4a]" />
            <div className="flex flex-col items-center">
              <span className="text-lg font-bold text-white">{user.followingCount}</span>
              <span className="text-[11px] text-slate-400 uppercase tracking-wide font-medium">Following</span>
            </div>
          </div>

          {/* Edit Profile Button */}
          <button
            onClick={onEditProfile}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-[#18233c] hover:bg-[#202e4f] border border-[#2b3d63] text-slate-200 text-xs font-semibold tracking-wide transition-all shadow-sm active:scale-[0.99] cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5 text-[#93c5fd]" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Subtabs: Projects | Activity */}
      <div className="w-full max-w-xl px-4">
        <div className="flex border-b border-[#1e2b48] mb-5">
          <button
            onClick={() => setActiveSubTab('projects')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeSubTab === 'projects'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Projects</span>
            {activeSubTab === 'projects' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" />
            )}
          </button>

          <button
            onClick={() => setActiveSubTab('activity')}
            className={`flex-1 py-3 text-xs sm:text-sm font-semibold transition-all relative ${
              activeSubTab === 'activity'
                ? 'text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>Activity</span>
            {activeSubTab === 'activity' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#3b82f6] shadow-[0_0_8px_#3b82f6]" />
            )}
          </button>
        </div>

        {/* Content based on subtab */}
        {activeSubTab === 'projects' ? (
          <div className="flex flex-col gap-4">
            {userProjects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group bg-[#131b2e] hover:bg-[#162038] border border-[#22304d] hover:border-[#3b82f6]/60 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer"
              >
                {/* Header: Title and Public/Private Globe/Lock Icon */}
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-[#93c5fd] transition-colors">
                    {project.title}
                  </h3>
                  <div>
                    {project.isPrivate ? (
                      <Lock className="w-4 h-4 text-slate-400" />
                    ) : (
                      <Globe className="w-4 h-4 text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                  {project.description}
                </p>

                {/* Tech tags */}
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

                {/* Meta stats */}
                <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#1e2b48]">
                  {project.isPrivate ? (
                    <div className="flex items-center gap-1 text-slate-400 font-medium">
                      <Star className="w-3.5 h-3.5" />
                      <span>Private</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-4">
                      <button
                        onClick={(e) => onToggleStar(project.id, e)}
                        className={`flex items-center gap-1 hover:text-amber-300 transition-colors ${
                          project.isStarred ? 'text-amber-400 font-semibold' : ''
                        }`}
                      >
                        <Star
                          className={`w-3.5 h-3.5 ${
                            project.isStarred ? 'fill-amber-400 text-amber-400' : ''
                          }`}
                        />
                        <span>
                          {project.stars >= 1000 ? `${(project.stars / 1000).toFixed(1)}k` : project.stars}
                        </span>
                      </button>

                      <div className="flex items-center gap-1">
                        <GitFork className="w-3.5 h-3.5" />
                        <span>{project.forks}</span>
                      </div>
                    </div>
                  )}

                  <div className="text-[11px] text-slate-400">
                    <span>{project.updatedAt}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div
                  key={act.id}
                  className="bg-[#131b2e] border border-[#22304d] rounded-xl p-4 flex items-start gap-3.5"
                >
                  <div className={`p-2 rounded-lg bg-[#0e1424] border border-[#1b253b] ${act.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xs sm:text-sm font-semibold text-white">{act.title}</h4>
                      <span className="text-[11px] text-slate-400 shrink-0">{act.time}</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{act.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
