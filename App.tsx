

import React, { useState, useCallback, useEffect } from 'react';
import { SubjectSidebar } from './components/SubjectSidebar';
import { QuestBoard } from './components/QuestBoard';
import { AIChat } from './components/AIChat';
import { SUBJECTS, WELCOME_MESSAGE } from './constants/quests';
import type { SubjectKey, ChatMessage, Quest } from './types';
import { generateExercises, generateQuiz } from './services/geminiService';
import * as authService from './services/authService';
import { Logo } from './components/Logo';
import { Leaderboard } from './components/Leaderboard';

type Theme = 'light' | 'dark';

interface AppProps {
  currentUser: string;
  onLogout: () => void;
  theme: Theme;
  toggleTheme: () => void;
}

const App: React.FC<AppProps> = ({ currentUser, onLogout, theme, toggleTheme }) => {
  const [selectedSubject, setSelectedSubject] = useState<SubjectKey | null>(null);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [streak, setStreak] = useState(0);
  const [lastCompletedDate, setLastCompletedDate] = useState<string | null>(null);
  const [toastMessage, setToastMessage] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [aiQuiz, setAiQuiz] = useState<{ subjectKey: SubjectKey; quest: Quest } | null>(null);
  const [isAiQuizLoading, setIsAiQuizLoading] = useState(false);
  const [isLeaderboardOpen, setIsLeaderboardOpen] = useState(false);

  useEffect(() => {
    const { streak: savedStreak, lastCompletedDate: savedDate } = authService.getStreak(currentUser);

    if (savedStreak && savedDate) {
      const today = new Date();
      const lastDate = new Date(savedDate);
      
      const isSameDay = today.getFullYear() === lastDate.getFullYear() &&
                        today.getMonth() === lastDate.getMonth() &&
                        today.getDate() === lastDate.getDate();

      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);
      const isYesterday = yesterday.getFullYear() === lastDate.getFullYear() &&
                          yesterday.getMonth() === lastDate.getMonth() &&
                          yesterday.getDate() === lastDate.getDate();

      if (isSameDay || isYesterday) {
        setStreak(savedStreak);
        setLastCompletedDate(savedDate);
      } else {
        // Streak is broken, reset it
        authService.saveStreak(currentUser, 0, null);
        setStreak(0);
        setLastCompletedDate(null);
      }
    } else {
        setStreak(0);
        setLastCompletedDate(null);
    }
  }, [currentUser]);

  const handleTaskCompletion = useCallback((rewards: string) => {
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];

    // Show completion toast
    setToastMessage(`🎉 Hoàn thành! Phần thưởng: ${rewards} 🥳`);
    setTimeout(() => setToastMessage(''), 5000);

    // Add XP to user
    const xpMatch = rewards.match(/\+(\d+)\s*XP/);
    if (xpMatch && xpMatch[1]) {
        const xpGained = parseInt(xpMatch[1], 10);
        if (!isNaN(xpGained)) {
            authService.addXp(currentUser, xpGained);
        }
    }

    // Update streak logic
    if (lastCompletedDate === todayStr) {
      return; // Already completed a task today
    }

    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];

    const newStreak = lastCompletedDate === yesterdayStr ? streak + 1 : 1;
    
    setStreak(newStreak);
    setLastCompletedDate(todayStr);
    
    authService.saveStreak(currentUser, newStreak, todayStr);
    
    if ([7, 30].includes(newStreak)) {
      // Use a different message for streak bonus
      setTimeout(() => {
        setToastMessage(`✨ CHÚC MỪNG BẠN ĐẠT CHUỖI ${newStreak} NGÀY! PHẦN THƯỞNG ĐẶC BIỆT ĐÃ MỞ KHÓA! ✨`);
        setTimeout(() => setToastMessage(''), 6000);
      }, 500); // Delay slightly to not overlap with the main reward toast
    }
  }, [streak, lastCompletedDate, currentUser]);


  const handleSelectSubject = (subject: SubjectKey) => {
    setSelectedSubject(subject);
    setIsSidebarOpen(false);
  };

  const handlePromptSuggestion = (prompt: string) => {
    setChatInput(prompt);
    setIsAiChatOpen(true);
  };

  const handleSendMessage = useCallback(async (message: string) => {
    if (!message.trim() || isAiLoading) return;

    const userMessage: ChatMessage = { sender: 'user', text: message };
    setChatMessages(prev => [...prev, userMessage]);
    setIsAiLoading(true);
    setChatInput('');

    try {
      const aiResponseText = await generateExercises(message);
      const aiMessage: ChatMessage = { sender: 'ai', text: aiResponseText };
      setChatMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error generating exercises:", error);
      const errorMessage: ChatMessage = {
        sender: 'ai',
        text: 'Ối, AI đang gặp chút trục trặc! 🛠️ Bạn thử lại sau một chút nhé! 🥺'
      };
      setChatMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsAiLoading(false);
    }
  }, [isAiLoading]);

  const handleGenerateAiQuiz = useCallback(async (subjectKey: SubjectKey) => {
    setIsAiQuizLoading(true);
    setAiQuiz(null);
    try {
        const subjectName = SUBJECTS[subjectKey].name;
        const newQuizQuest = await generateQuiz(subjectName);
        setAiQuiz({ subjectKey, quest: newQuizQuest });
    } catch (error) {
        console.error("Failed to generate AI quiz:", error);
        setToastMessage('🤖 AI không thể tạo quiz lúc này. Bạn thử lại nhé!');
        setTimeout(() => setToastMessage(''), 5000);
    } finally {
        setIsAiQuizLoading(false);
    }
  }, []);

  const handleClearAiQuiz = () => {
      setAiQuiz(null);
  };

  return (
    <>
      {toastMessage && (
        <div className="absolute top-5 right-5 bg-success text-white px-6 py-3 z-50 animate-fade-in-down rounded-lg shadow-lg max-w-md text-center">
          <p className="font-bold uppercase tracking-wider">{toastMessage}</p>
        </div>
      )}
      <div className="flex flex-col md:flex-row h-screen font-sans bg-bg text-text overflow-hidden">
        <header className="md:hidden flex items-center justify-between p-2 bg-surface1 shadow-sm sticky top-0 z-30">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-text-muted">
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h1 className="text-xl font-bold text-primary uppercase">Học Mà Chơi</h1>
          <Logo />
        </header>

        {isSidebarOpen && (
          <div 
            className="md:hidden fixed inset-0 bg-black/50 z-40" 
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          ></div>
        )}
        
        <SubjectSidebar 
          subjects={SUBJECTS} 
          selectedSubject={selectedSubject} 
          onSelectSubject={handleSelectSubject} 
          streak={streak}
          theme={theme}
          toggleTheme={toggleTheme}
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          currentUser={currentUser}
          onLogout={onLogout}
          onOpenLeaderboard={() => setIsLeaderboardOpen(true)}
        />

        <main className="flex-1 overflow-y-auto">
           <QuestBoard 
              subject={selectedSubject ? SUBJECTS[selectedSubject] : null}
              subjectKey={selectedSubject}
              onPromptSuggestion={handlePromptSuggestion} 
              onTaskCompletion={handleTaskCompletion}
              aiQuiz={aiQuiz}
              isAiQuizLoading={isAiQuizLoading}
              onGenerateAiQuiz={handleGenerateAiQuiz}
              onClearAiQuiz={handleClearAiQuiz}
            />
        </main>
      </div>

      {isAiChatOpen && (
        <div
          className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4 animate-fade-in-fast"
          onClick={() => setIsAiChatOpen(false)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="bg-surface1 rounded-2xl shadow-xl w-full max-w-2xl h-[90vh] max-h-[700px] flex flex-col transform animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
              <h2 className="text-lg font-bold flex items-center gap-3">
                <i className="fa-solid fa-robot text-primary text-xl"></i>
                <span>Game Master AI</span>
              </h2>
              <button
                onClick={() => setIsAiChatOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-surface2 hover:text-primary transition-colors"
                aria-label="Đóng AI Chat"
              >
                <i className="fa-solid fa-times text-xl"></i>
              </button>
            </header>
            <div className="flex-1 overflow-hidden p-4">
              <AIChat
                messages={chatMessages}
                isLoading={isAiLoading}
                onSendMessage={handleSendMessage}
                input={chatInput}
                setInput={setChatInput}
              />
            </div>
          </div>
        </div>
      )}

      {isLeaderboardOpen && (
        <Leaderboard 
            isOpen={isLeaderboardOpen} 
            onClose={() => setIsLeaderboardOpen(false)} 
            currentUser={currentUser} 
        />
      )}
      
       <button
          onClick={() => setIsAiChatOpen(prev => !prev)}
          className="fixed bottom-6 right-6 w-16 h-16 bg-primary rounded-full shadow-lg flex items-center justify-center text-white z-30 hover:opacity-90 transition-all duration-300 transform hover:scale-110"
          aria-label={isAiChatOpen ? "Đóng AI Chat" : "Mở AI Chat"}
      >
          <i className={`fa-solid ${isAiChatOpen ? 'fa-times' : 'fa-robot'} text-2xl transition-transform duration-300 ${isAiChatOpen ? 'rotate-180' : ''}`}></i>
      </button>

      <style>{`
        @keyframes fade-in-down {
            from { opacity: 0; transform: translateY(-20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-down {
            animation: fade-in-down 0.5s ease-out forwards;
        }
        @keyframes fade-in-fast {
            from { opacity: 0; }
            to { opacity: 1; }
        }
        .animate-fade-in-fast {
            animation: fade-in-fast 0.2s ease-out forwards;
        }
        @keyframes scale-in {
            from { opacity: 0; transform: scale(0.95); }
            to { opacity: 1; transform: scale(1); }
        }
        .animate-scale-in {
            animation: scale-in 0.2s ease-out forwards;
        }
      `}</style>
    </>
  );
};

export default App;