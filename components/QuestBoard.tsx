
import React from 'react';
import { QuestCard } from './QuestCard';
import type { Subject, SubjectKey, Quest } from '../types';

interface QuestBoardProps {
  subject: Subject | null;
  subjectKey: SubjectKey | null;
  onPromptSuggestion: (prompt: string) => void;
  onTaskCompletion: (rewards: string) => void;
  aiQuiz: { subjectKey: SubjectKey; quest: Quest } | null;
  isAiQuizLoading: boolean;
  onGenerateAiQuiz: (subjectKey: SubjectKey) => void;
  onClearAiQuiz: () => void;
}

export const QuestBoard: React.FC<QuestBoardProps> = ({ subject, subjectKey, onPromptSuggestion, onTaskCompletion, aiQuiz, isAiQuizLoading, onGenerateAiQuiz, onClearAiQuiz }) => {
  if (!subject || !subjectKey) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-bg">
        <div className="w-24 h-24 bg-surface1 flex items-center justify-center mb-6 rounded-2xl shadow-md">
            <i className="fa-solid fa-wand-magic-sparkles text-6xl text-primary"></i>
        </div>
        <h2 className="text-2xl md:text-3xl mb-2 uppercase tracking-wider">Chào mừng đến cuộc phiêu lưu!</h2>
        <p className="text-text-muted max-w-md">
          Hãy chọn một môn học từ danh sách để bắt đầu hành trình chinh phục tri thức! 🚀
        </p>
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 bg-bg h-full">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-surface1 flex items-center justify-center rounded-xl shadow-sm">
            <i className={`fa-solid ${subject.icon} text-3xl text-primary`}></i>
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl text-text">{subject.name}</h1>
            <p className="text-text-muted uppercase tracking-wider text-sm">Sẵn sàng chinh phục {subject.quests.length} nhiệm vụ!</p>
          </div>
        </div>
        <button
          onClick={() => onGenerateAiQuiz(subjectKey)}
          disabled={isAiQuizLoading}
          className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary font-semibold rounded-lg hover:bg-primary/20 transition-all disabled:opacity-50 disabled:cursor-wait shrink-0"
        >
          {isAiQuizLoading ? (
              <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  <span>Đang sáng tạo...</span>
              </>
          ) : (
              <>
                  <i className="fa-solid fa-wand-magic-sparkles"></i>
                  <span>Tạo Quiz Nhanh</span>
              </>
          )}
        </button>
      </header>
      <div className="space-y-4">
        {aiQuiz && aiQuiz.subjectKey === subjectKey && (
          <QuestCard 
              key="ai-generated-quiz" 
              quest={aiQuiz.quest}
              onPromptSuggestion={onPromptSuggestion}
              onTaskCompletion={onTaskCompletion}
              isAiGenerated={true}
              onClear={onClearAiQuiz}
          />
        )}
        {subject.quests.map((quest, index) => (
          <QuestCard 
            key={`${subjectKey}-${index}`} 
            quest={quest} 
            onPromptSuggestion={onPromptSuggestion}
            onTaskCompletion={onTaskCompletion}
          />
        ))}
      </div>
    </div>
  );
};
