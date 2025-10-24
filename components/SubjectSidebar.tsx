import React, { useState, useEffect, useRef } from 'react';
import type { Subject, SubjectKey } from '../types';
import { Logo } from './Logo';
import * as authService from '../services/authService';

interface SubjectSidebarProps {
  subjects: Record<string, Subject>;
  selectedSubject: SubjectKey | null;
  onSelectSubject: (subject: SubjectKey) => void;
  streak: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  currentUser: string;
  onLogout: () => void;
  onOpenLeaderboard: () => void;
}

export const SubjectSidebar: React.FC<SubjectSidebarProps> = ({ subjects, selectedSubject, onSelectSubject, streak, theme, toggleTheme, isOpen, setIsOpen, currentUser, onLogout, onOpenLeaderboard }) => {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const avatar = authService.getAvatar(currentUser);
    if (avatar) {
      setAvatarUrl(avatar);
    }
  }, [currentUser]);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        authService.saveAvatar(currentUser, result);
        setAvatarUrl(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const sidebarContent = (
    <>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
            <Logo />
            <h1 className="text-2xl text-primary uppercase">Học Mà Chơi</h1>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-text-muted text-2xl">
            <i className="fa-solid fa-times"></i>
        </button>
      </div>
      <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-1">
        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider px-2 mb-2">Tiến độ</h2>
        <div className={`flex items-center gap-3 p-3 mb-4 transition-all duration-300 rounded-lg ${
            streak > 0 
            ? 'bg-accent/10 text-text' 
            : 'bg-surface2 text-text-muted'
        }`}>
            <i className={`fa-solid fa-fire-flame-curved w-5 text-center text-lg ${
                streak > 0 
                ? 'text-accent animate-flame-pulse' 
                : 'text-text-muted'
            }`}></i>
            <div>
                <p className="font-bold">{streak} ngày</p>
                <p className="text-xs">{streak > 0 ? 'Chuỗi thắng lợi!' : 'Bắt đầu một quiz!'}</p>
            </div>
        </div>

        <h2 className="text-sm font-semibold text-text-muted uppercase tracking-wider px-2 mb-2">Môn học</h2>
        {Object.keys(subjects).map((key) => {
          const subject = subjects[key];
          const isSelected = selectedSubject === key;
          return (
            <button
              key={key}
              onClick={() => onSelectSubject(key as SubjectKey)}
              className={`flex items-center gap-3 px-3 py-2 text-left transition-all duration-200 w-full rounded-md ${
                isSelected
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-text-muted hover:bg-surface2 hover:text-text'
              }`}
            >
              <i className={`fa-solid ${subject.icon} w-5 text-center text-lg`}></i>
              <span>{subject.name}</span>
            </button>
          );
        })}
      </nav>

      <div className="mt-4 border-t border-border pt-4 space-y-2">
          <button
              onClick={onOpenLeaderboard}
              className="w-full flex items-center justify-between p-2 text-text-muted hover:bg-surface2 transition-colors rounded-md"
          >
              <div className="flex items-center gap-3">
                  <i className="fa-solid fa-trophy w-5 text-center text-lg text-primary"></i>
                  <span>Bảng Xếp Hạng</span>
              </div>
          </button>
          <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between p-2 text-text-muted hover:bg-surface2 transition-colors rounded-md"
          >
              <div className="flex items-center gap-3">
                  <i className={`fa-solid ${theme === 'dark' ? 'fa-sun' : 'fa-moon'} w-5 text-center text-lg text-primary`}></i>
                  <span>Giao diện {theme === 'dark' ? 'Sáng' : 'Tối'}</span>
              </div>
              <div className="relative w-12 h-6 flex items-center bg-surface2 rounded-full">
                  <div className={`absolute w-5 h-5 bg-primary rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${theme === 'dark' ? 'translate-x-0.5' : 'translate-x-6'}`}></div>
              </div>
          </button>
           <div className="flex items-center justify-between p-2 text-text-muted bg-surface2/50 rounded-md">
              <div className="flex items-center gap-3 truncate">
                  <button onClick={handleAvatarClick} className="w-8 h-8 rounded-full bg-surface2 flex items-center justify-center cursor-pointer overflow-hidden group relative shrink-0" title="Đổi ảnh đại diện">
                      {avatarUrl ? (
                          <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                      ) : (
                          <i className="fa-solid fa-user-circle text-primary text-2xl"></i>
                      )}
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <i className="fa-solid fa-camera text-white text-sm"></i>
                      </div>
                  </button>
                  <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="hidden"
                  />
                  <span className="font-semibold truncate text-text">{currentUser}</span>
              </div>
              <button onClick={onLogout} title="Đăng xuất" className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-surface2 hover:text-red-400 transition-colors">
                 <i className="fa-solid fa-right-from-bracket"></i>
              </button>
          </div>
      </div>
    </>
  );

  return (
    <>
      <aside className="hidden md:flex flex-col w-64 bg-surface1 p-4 border-r border-border">
          {sidebarContent}
      </aside>

      {/* Mobile Sidebar */}
      <aside className={`md:hidden fixed top-0 left-0 h-full w-64 bg-surface1 p-4 z-50 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'} flex flex-col`}>
          {sidebarContent}
      </aside>

      <style>{`
        @keyframes flame-pulse {
          0%, 100% {
            transform: scale(1);
            filter: drop-shadow(0 0 2px var(--accent-color));
          }
          50% {
            transform: scale(1.1);
            filter: drop-shadow(0 0 6px var(--accent-color));
          }
        }
        .animate-flame-pulse {
          animation: flame-pulse 2s infinite ease-in-out;
        }
      `}</style>
    </>
  );
};