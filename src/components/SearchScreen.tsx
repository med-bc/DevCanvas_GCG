import React, { useState, useMemo } from 'react';
import { Search, X, Star, GitFork, BookMarked, ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react';
import { Project, ActiveTab } from '../types';

interface SearchScreenProps {
  projects: Project[];
  initialQuery?: string;
  onSelectProject: (project: Project) => void;
  onToggleStar: (projectId: string, e: React.MouseEvent) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  projects,
  initialQuery = 'Python',
  onSelectProject,
  onToggleStar,
  setActiveTab,
}) => {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'relevant' | 'stars' | 'updated' | 'forks'>('relevant');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const categories = ['All', 'Machine Learning', 'Web', 'Backend', 'Desktop', 'UI', 'Serverless'];

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesQuery =
        query === '' ||
        project.title.toLowerCase().includes(query.toLowerCase()) ||
        project.description.toLowerCase().includes(query.toLowerCase()) ||
        project.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()));

      const matchesCat =
        selectedCategory === 'All' ||
        project.category === selectedCategory ||
        project.tags.includes(selectedCategory);

      return matchesQuery && matchesCat;
    }).sort((a, b) => {
      if (sortBy === 'stars') return b.stars - a.stars;
      if (sortBy === 'forks') return b.forks - a.forks;
      return 0; // default relevant
    });
  }, [projects, query, selectedCategory, sortBy]);

  const totalResultsCount = 14203 + (filteredProjects.length > 0 ? filteredProjects.length * 100 : 0);

  return (
    <div className="w-full flex flex-col items-center pb-24">
      {/* Search Header Container */}
      <div className="w-full max-w-xl px-4 pt-6 pb-4">
        {/* Search Input Box */}
        <div className="relative mb-4">
          <div className="flex items-center w-full bg-[#131b2e] border border-[#233354] rounded-xl px-3.5 py-3 shadow-md focus-within:border-[#3b82f6] transition-all">
            <Search className="w-5 h-5 text-slate-400 mr-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search repositories, technologies..."
              className="w-full bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-[#1f2b48] transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none mb-3">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-4 py-1.5 rounded-xl text-xs font-mono font-medium transition-all shrink-0 cursor-pointer ${
                  isSelected
                    ? 'bg-[#1e2a4a] text-white border border-[#3b82f6] shadow-sm'
                    : 'bg-[#131b2e] text-slate-400 hover:text-slate-200 border border-[#22304d]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Sort Dropdown */}
        <div className="relative inline-block mb-6">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="appearance-none bg-[#131b2e] border border-[#22304d] text-slate-200 text-xs font-medium rounded-xl pl-3.5 pr-8 py-2 focus:outline-none focus:border-[#3b82f6] cursor-pointer"
          >
            <option value="relevant">Most Relevant</option>
            <option value="stars">Most Stars</option>
            <option value="forks">Most Forks</option>
            <option value="updated">Recently Updated</option>
          </select>
          <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* Results Counter */}
        <div className="border-t border-[#1b253b] pt-5 pb-3">
          <h2 className="text-xl font-bold text-white tracking-tight">
            {totalResultsCount.toLocaleString()} repository results
          </h2>
        </div>
      </div>

      {/* Repository Cards List */}
      <div className="w-full max-w-xl px-4 flex flex-col gap-4 mb-8">
        {filteredProjects.length === 0 ? (
          <div className="bg-[#131b2e] border border-[#22304d] rounded-2xl p-8 text-center text-slate-400">
            <BookMarked className="w-8 h-8 mx-auto mb-3 text-slate-500" />
            <p className="text-sm font-semibold text-slate-200">No repositories found for &quot;{query}&quot;</p>
            <p className="text-xs text-slate-400 mt-1">Try clearing your filters or search keywords.</p>
            <button
              onClick={() => {
                setQuery('');
                setSelectedCategory('All');
              }}
              className="mt-4 px-4 py-2 rounded-lg bg-[#1e2a4a] text-[#93c5fd] text-xs font-medium border border-[#3b82f6]/40"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group bg-[#131b2e] hover:bg-[#162038] border border-[#22304d] hover:border-[#3b82f6]/60 rounded-2xl p-5 shadow-lg transition-all duration-200 cursor-pointer"
            >
              {/* Repo Title with Icon */}
              <div className="flex items-center gap-2 mb-2">
                <BookMarked className="w-4 h-4 text-slate-400 group-hover:text-[#93c5fd] transition-colors" />
                <h3 className="text-lg font-bold text-white group-hover:text-[#93c5fd] transition-colors">
                  {project.title}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-2">
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

              {/* Meta stats row */}
              <div className="flex items-center justify-between text-xs text-slate-400 pt-2 border-t border-[#1e2b48]">
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
                    <span>{project.forks >= 1000 ? `${(project.forks / 1000).toFixed(1)}k` : project.forks}</span>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981]" />
                  <span>{project.updatedAt}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination */}
      <div className="w-full max-w-xl px-4 flex items-center justify-center gap-2 text-xs font-mono text-slate-400 mb-12">
        <button
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-lg bg-[#131b2e] border border-[#22304d] hover:bg-[#1b253b] disabled:opacity-30 disabled:pointer-events-none"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <button
          onClick={() => setCurrentPage(1)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
            currentPage === 1
              ? 'bg-[#1e2a4a] text-white border border-[#3b82f6]'
              : 'bg-[#131b2e] border border-[#22304d] hover:bg-[#1b253b]'
          }`}
        >
          1
        </button>

        <button
          onClick={() => setCurrentPage(2)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
            currentPage === 2
              ? 'bg-[#1e2a4a] text-white border border-[#3b82f6]'
              : 'bg-[#131b2e] border border-[#22304d] hover:bg-[#1b253b]'
          }`}
        >
          2
        </button>

        <button
          onClick={() => setCurrentPage(3)}
          className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
            currentPage === 3
              ? 'bg-[#1e2a4a] text-white border border-[#3b82f6]'
              : 'bg-[#131b2e] border border-[#22304d] hover:bg-[#1b253b]'
          }`}
        >
          3
        </button>

        <span className="px-1 text-slate-500">...</span>

        <button
          onClick={() => setCurrentPage(142)}
          className={`w-9 h-8 rounded-lg flex items-center justify-center font-bold ${
            currentPage === 142
              ? 'bg-[#1e2a4a] text-white border border-[#3b82f6]'
              : 'bg-[#131b2e] border border-[#22304d] hover:bg-[#1b253b]'
          }`}
        >
          142
        </button>

        <button
          onClick={() => setCurrentPage((p) => p + 1)}
          className="p-2 rounded-lg bg-[#131b2e] border border-[#22304d] hover:bg-[#1b253b]"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
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
          <button onClick={() => alert("Documentation view")} className="hover:text-white transition-colors">
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
  );
};
