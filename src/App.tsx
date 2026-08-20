/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { BottomNav } from './components/BottomNav';
import { HomeScreen } from './components/HomeScreen';
import { SearchScreen } from './components/SearchScreen';
import { ProjectDetailScreen } from './components/ProjectDetailScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { UploadWizardScreen } from './components/UploadWizardScreen';
import { ContactHistoryScreen } from './components/ContactHistoryScreen';
import { MyProjectsScreen } from './components/MyProjectsScreen';
import { AuthModal } from './components/AuthModal';
import { ChatModal } from './components/ChatModal';
import { ForkModal } from './components/ForkModal';
import { EditProfileModal } from './components/EditProfileModal';
import { INITIAL_PROJECTS, INITIAL_USER_PROFILE, INITIAL_CONTACT_MESSAGES } from './data/mockData';
import { ActiveTab, Project, ContactMessage, UserProfile } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('explore');
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER_PROFILE);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [contactMessages, setContactMessages] = useState<ContactMessage[]>(INITIAL_CONTACT_MESSAGES);

  // Selected project for detail view
  const [selectedProject, setSelectedProject] = useState<Project | null>(INITIAL_PROJECTS[0]);
  const [searchInitialQuery, setSearchInitialQuery] = useState<string>('Python');

  // Modals state
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<ContactMessage | null>(null);
  const [chatTargetProject, setChatTargetProject] = useState<Project | null>(null);

  const [isForkModalOpen, setIsForkModalOpen] = useState(false);
  const [forkTargetProject, setForkTargetProject] = useState<Project | null>(null);

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

  // Mobile frame wrapper toggle (matches the exact mobile mockups or responsive full-width)
  const [isMobileFrame, setIsMobileFrame] = useState(false);

  // Toggle star
  const handleToggleStar = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          const isStarred = !p.isStarred;
          return {
            ...p,
            isStarred,
            stars: isStarred ? p.stars + 1 : Math.max(0, p.stars - 1),
          };
        }
        return p;
      })
    );
  };

  // Select project to open detail view
  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveTab('detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select project by ID
  const handleSelectProjectById = (projectId: string) => {
    const found = projects.find((p) => p.id === projectId);
    if (found) {
      handleSelectProject(found);
    } else {
      setActiveTab('explore');
    }
  };

  // Open contact chat modal for a project
  const handleOpenContactForProject = (project: Project) => {
    // Check if conversation already exists in contact history
    const existing = contactMessages.find((m) => m.projectId === project.id);
    if (existing) {
      setActiveChat(existing);
      setChatTargetProject(project);
    } else {
      setActiveChat(null);
      setChatTargetProject(project);
    }
    setIsChatOpen(true);
  };

  // Open chat from Contact History
  const handleOpenChat = (msg: ContactMessage) => {
    setActiveChat(msg);
    setChatTargetProject(projects.find((p) => p.id === msg.projectId) || null);
    setIsChatOpen(true);
  };

  // Send message in Chat
  const handleSendMessage = (
    projectId: string,
    projectTitle: string,
    creatorName: string,
    creatorUsername: string,
    text: string
  ) => {
    const newChatMsg = {
      id: `chat-${Date.now()}`,
      sender: 'user' as const,
      text,
      timestamp: 'Just now',
    };

    setContactMessages((prev) => {
      const existingIndex = prev.findIndex((m) => m.projectId === projectId);
      if (existingIndex >= 0) {
        const updated = [...prev];
        updated[existingIndex] = {
          ...updated[existingIndex],
          status: 'sent',
          lastMessage: text,
          timeAgo: 'Just now',
          chatHistory: [...updated[existingIndex].chatHistory, newChatMsg],
        };
        setActiveChat(updated[existingIndex]);
        return updated;
      } else {
        const newRecord: ContactMessage = {
          id: `msg-${Date.now()}`,
          projectId,
          projectTitle,
          creatorUsername,
          creatorName,
          creatorAvatar:
            chatTargetProject?.author.avatar ||
            'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
          status: 'sent',
          timeAgo: 'Just now',
          tags: chatTargetProject?.tags || ['OpenSource'],
          lastMessage: text,
          chatHistory: [newChatMsg],
        };
        setActiveChat(newRecord);
        return [newRecord, ...prev];
      }
    });

    // Auto simulated creator response after 2.5 seconds for engaging feedback!
    setTimeout(() => {
      setContactMessages((prev) => {
        const existingIndex = prev.findIndex((m) => m.projectId === projectId);
        if (existingIndex >= 0) {
          const updated = [...prev];
          const autoReply = {
            id: `reply-${Date.now()}`,
            sender: 'creator' as const,
            text: `Thanks for reaching out about ${projectTitle}! We'd love your contribution. Check out our dev branch to get started.`,
            timestamp: 'Just now',
          };
          updated[existingIndex] = {
            ...updated[existingIndex],
            status: 'replied',
            lastMessage: autoReply.text,
            timeAgo: 'Just now',
            chatHistory: [...updated[existingIndex].chatHistory, autoReply],
          };
          setActiveChat(updated[existingIndex]);
          return updated;
        }
        return prev;
      });
    }, 2500);
  };

  // Open Clone/Fork Modal
  const handleOpenForkModal = (project: Project) => {
    setForkTargetProject(project);
    setIsForkModalOpen(true);
  };

  // Handle Fork repository
  const handleForkSuccess = (originalProject: Project) => {
    const forkedCopy: Project = {
      ...originalProject,
      id: `${originalProject.id}-fork-${Date.now().toString().slice(-4)}`,
      title: `${originalProject.title} (Fork)`,
      author: {
        name: user.name,
        username: user.username,
        avatar: user.avatar,
        role: user.role,
        isOnline: true,
      },
      stars: 0,
      forks: 0,
      views: 1,
      isPublic: true,
      isDraft: false,
      updatedAt: 'Just now',
    };
    setProjects((prev) => [forkedCopy, ...prev]);
    setUser((prev) => ({ ...prev, projectsCount: prev.projectsCount + 1 }));
    setActiveTab('projects');
  };

  // Add new project from wizard
  const handleAddProject = (newProject: Project) => {
    setProjects((prev) => [newProject, ...prev]);
    setUser((prev) => ({ ...prev, projectsCount: prev.projectsCount + 1 }));
  };

  // Delete project
  const handleDeleteProject = (projectId: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== projectId));
    setUser((prev) => ({ ...prev, projectsCount: Math.max(0, prev.projectsCount - 1) }));
  };

  // Search trigger from Home
  const handleSearchFromHome = (query: string) => {
    setSearchInitialQuery(query);
    setActiveTab('search');
  };

  return (
    <div className="min-h-screen bg-[#0b101e] text-slate-100 flex flex-col items-center">
      {/* Container wrapper: handles Mobile Frame mode or Fluid Responsive mode */}
      <div
        className={`w-full flex flex-col transition-all duration-300 min-h-screen ${
          isMobileFrame
            ? 'max-w-[430px] my-4 rounded-3xl border-4 border-[#1e293b] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden bg-[#0b101e]'
            : 'max-w-4xl'
        }`}
      >
        {/* Top Navigation */}
        <Navbar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          user={user}
          isLoggedIn={isLoggedIn}
          onOpenAuth={() => setIsAuthOpen(true)}
          isMobileFrame={isMobileFrame}
          setIsMobileFrame={setIsMobileFrame}
          unreadCount={contactMessages.filter((m) => m.status === 'replied').length}
        />

        {/* Main Content Render */}
        <main className="flex-1 w-full">
          {activeTab === 'explore' && (
            <HomeScreen
              projects={projects}
              onSelectProject={handleSelectProject}
              onOpenContact={handleOpenContactForProject}
              onToggleStar={handleToggleStar}
              setActiveTab={setActiveTab}
              onSearch={handleSearchFromHome}
            />
          )}

          {activeTab === 'search' && (
            <SearchScreen
              projects={projects}
              initialQuery={searchInitialQuery}
              onSelectProject={handleSelectProject}
              onToggleStar={handleToggleStar}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'detail' && selectedProject && (
            <ProjectDetailScreen
              project={selectedProject}
              onBack={() => setActiveTab('explore')}
              onOpenContact={handleOpenContactForProject}
              onOpenForkModal={handleOpenForkModal}
              onToggleStar={handleToggleStar}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'upload' && (
            <UploadWizardScreen
              user={user}
              onAddProject={handleAddProject}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'projects' && (
            <MyProjectsScreen
              projects={projects}
              onSelectProject={handleSelectProject}
              onEditProject={(p) => {
                handleSelectProject(p);
              }}
              onDeleteProject={handleDeleteProject}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'profile' && (
            <ProfileScreen
              user={user}
              projects={projects}
              onSelectProject={handleSelectProject}
              onEditProfile={() => setIsEditProfileOpen(true)}
              onToggleStar={handleToggleStar}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'contacts' && (
            <ContactHistoryScreen
              messages={contactMessages}
              onOpenChat={handleOpenChat}
              onSelectProjectById={handleSelectProjectById}
              setActiveTab={setActiveTab}
            />
          )}
        </main>

        {/* Bottom Navigation (Always fixed at bottom) */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />
      </div>

      {/* Global Interactive Modals */}
      <AuthModal
        isOpen={isAuthOpen}
        onClose={() => setIsAuthOpen(false)}
        onLoginSuccess={(email, username) => {
          setIsLoggedIn(true);
          setUser((prev) => ({ ...prev, username: username || prev.username }));
        }}
      />

      <ChatModal
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        contactMessage={activeChat}
        targetProject={chatTargetProject}
        onSendMessage={handleSendMessage}
      />

      <ForkModal
        isOpen={isForkModalOpen}
        onClose={() => setIsForkModalOpen(false)}
        project={forkTargetProject}
        onForkSuccess={handleForkSuccess}
      />

      <EditProfileModal
        isOpen={isEditProfileOpen}
        onClose={() => setIsEditProfileOpen(false)}
        user={user}
        onSaveProfile={(updated) => setUser(updated)}
      />
    </div>
  );
}
