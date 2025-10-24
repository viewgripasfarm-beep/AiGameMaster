
import React, { useState } from 'react';
import type { Quest, QuizQuestion } from '../types';
import { MiniGameHost } from './MiniGames/MiniGameHost';

interface QuestCardProps {
  quest: Quest;
  onPromptSuggestion: (prompt: string) => void;
  onTaskCompletion: (rewards: string) => void;
  isAiGenerated?: boolean;
  onClear?: () => void;
}

interface QuizProps {
  quiz: QuizQuestion[];
  onComplete: () => void;
}

const RewardDisplay: React.FC<{ rewards: string }> = ({ rewards }) => {
  const xpMatch = rewards.match(/\+(\d+)\s*XP/);
  const coinMatch = rewards.match(/(\d+)\s*xu/);
  const badgeMatch = rewards.match(/huy hiệu "([^"]+)"/);

  const xp = xpMatch ? xpMatch[1] : null;
  const coins = coinMatch ? coinMatch[1] : null;
  const badge = badgeMatch ? badgeMatch[1] : null;
  const emojiMatch = rewards.match(/([👑✨⚡️🪙🗺️💨🧪🔬📜🧭🧠🛡️🤖])/g) || [];

  const rewardItems = [];
  if (xp) {
    rewardItems.push(
      <div key="xp" className="flex items-center gap-1.5 bg-surface2 px-2.5 py-1 text-sm rounded-full animate-reward-chip">
        <i className="fa-solid fa-star icon-gradient-xp"></i>
        <span className="font-semibold text-text">{xp} XP</span>
      </div>
    );
  }
  if (coins) {
    rewardItems.push(
      <div key="coins" className="flex items-center gap-1.5 bg-surface2 px-2.5 py-1 text-sm rounded-full animate-reward-chip">
        <i className="fa-solid fa-coins icon-gradient-coin"></i>
        <span className="font-semibold text-text">{coins} Xu</span>
      </div>
    );
  }
  if (badge) {
    rewardItems.push(
      <div key="badge" className="flex items-center gap-1.5 bg-surface2 px-2.5 py-1 text-sm rounded-full animate-reward-chip">
        <i className="fa-solid fa-medal icon-gradient-badge"></i>
        <span className="font-semibold text-text">"{badge}" {emojiMatch.find(e => e !== '🪙')}</span>
      </div>
    );
  }

  return (
    <div className="flex items-start">
      <strong className="text-primary mr-2 shrink-0 uppercase tracking-wider text-xs pt-1">🏅 Phần thưởng:</strong>
      <div className="flex flex-wrap items-center gap-2">
         {rewardItems.map((item, index) => 
            React.cloneElement(item, { style: { animationDelay: `${(index + 1) * 0.1}s` } })
        )}
      </div>
    </div>
  );
};


const Quiz: React.FC<QuizProps> = ({ quiz, onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
    onComplete();
  };

  const getOptionClasses = (questionIndex: number, option: string, correctAnswer: string) => {
    if (!submitted) {
      return answers[questionIndex] === option
        ? 'bg-primary text-white ring-2 ring-primary'
        : 'bg-surface2 hover:bg-border';
    }
    if (option === correctAnswer) {
      return 'bg-success text-white';
    }
    if (answers[questionIndex] === option && option !== correctAnswer) {
      return 'bg-red-500 text-white';
    }
    return 'bg-surface2 text-text-muted';
  };
  
  const calculateScore = () => {
    return quiz.reduce((score, q, i) => {
        return answers[i] === q.correctAnswer ? score + 1 : score;
    }, 0)
  }

  return (
    <div className="mt-4 border-t border-border pt-4">
      <h4 className="font-bold text-lg text-primary mb-3 uppercase tracking-wider">❓ Quiz "Não cá vàng"</h4>
      <div className="space-y-4">
        {quiz.map((q, i) => (
          <div key={i}>
            <p className="text-text mb-2">{i + 1}. {q.question}</p>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleSelectAnswer(i, opt)}
                  disabled={submitted}
                  className={`p-2.5 text-left transition-all text-sm rounded-md ${getOptionClasses(i, opt, q.correctAnswer)}`}
                >
                  {opt.startsWith('A.') || opt.startsWith('B.') || opt.startsWith('C.') ? opt.substring(3) : opt}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 text-center">
        {submitted ? (
            <div className="p-3 bg-success/10 border-2 border-success text-success-darker rounded-lg">
                <p className="font-bold text-lg uppercase">BẠN ĐÚNG {calculateScore()}/{quiz.length} CÂU! 🎉</p>
                <button onClick={() => { setSubmitted(false); setAnswers({}); }} className="mt-2 text-sm text-primary hover:underline font-semibold">LÀM LẠI QUIZ</button>
            </div>
        ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== quiz.length}
              className="px-8 py-3 bg-primary hover:opacity-90 text-white font-bold disabled:bg-surface2 disabled:text-text-muted disabled:cursor-not-allowed transition-colors uppercase tracking-wider rounded-full shadow-md hover:shadow-lg"
            >
              Nộp bài
            </button>
        )}
      </div>
    </div>
  );
};


export const QuestCard: React.FC<QuestCardProps> = ({ quest, onPromptSuggestion, onTaskCompletion, isAiGenerated, onClear }) => {
  const [isExpanded, setIsExpanded] = useState(isAiGenerated || false);

  return (
    <div className={`bg-surface1 rounded-xl shadow-md transition-shadow duration-300 hover:shadow-lg ${isAiGenerated ? 'ring-2 ring-primary/50' : ''}`}>
        <div className="flex justify-between items-center p-4 md:p-5">
            <div className="flex-1 flex items-center gap-3 cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
                {isAiGenerated && <span className="text-2xl">🤖</span>}
                <div>
                    <h3 className="text-xl font-bold text-text">{quest.name}</h3>
                    <p className="text-sm text-text-muted mt-1">{quest.description}</p>
                </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
                {isAiGenerated && onClear && (
                    <button
                        onClick={onClear}
                        className="w-10 h-10 flex items-center justify-center rounded-full text-text-muted hover:bg-surface2 hover:text-red-400 transition-colors"
                        aria-label="Xóa Quiz AI"
                    >
                        <i className="fa-solid fa-trash-can"></i>
                    </button>
                )}
                <button onClick={() => setIsExpanded(!isExpanded)} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface2 transition-colors">
                    <i className={`fa-solid fa-chevron-down text-text-muted transition-transform duration-300 text-xl ${isExpanded ? 'rotate-180 text-primary' : ''}`}></i>
                </button>
            </div>
        </div>
      
      {isExpanded && (
        <div className="p-4 md:p-5 border-t border-border animate-fade-in">
          <div className="space-y-4">
            <p><strong className="text-primary uppercase tracking-wider text-xs">🎯 Mục tiêu:</strong> <span className="text-text-muted">{quest.learningObjective}</span></p>
            <RewardDisplay rewards={quest.rewards} />
            
            {quest.miniGame && <MiniGameHost game={quest.miniGame} onComplete={() => onTaskCompletion(quest.rewards)} />}

            <div 
              className="group bg-primary/5 p-4 rounded-lg flex items-center justify-between gap-3 cursor-pointer transition-all duration-300 hover:bg-primary/10"
              onClick={() => onPromptSuggestion(quest.aiPromptSuggestion)}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5">🤖</span>
                <div>
                  <p className="font-semibold text-primary uppercase tracking-wider">Luyện tập cùng AI</p>
                  <p className="text-text-muted italic text-sm">"{quest.aiPromptSuggestion}"</p>
                </div>
              </div>
              <div className="flex items-center shrink-0">
                <i className="fa-solid fa-arrow-right text-text-muted group-hover:translate-x-1 group-hover:text-primary transition-transform"></i>
              </div>
            </div>
          </div>
          <Quiz quiz={quest.miniQuiz} onComplete={() => onTaskCompletion(quest.rewards)} />
        </div>
      )}
       <style>{`
        @keyframes fade-in {
            from { opacity: 0; max-height: 0; }
            to { opacity: 1; max-height: 2000px; }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out;
            overflow: hidden;
        }

        /* New styles for rewards */
        @keyframes reward-chip-in {
          from {
            opacity: 0;
            transform: translateY(10px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .animate-reward-chip {
            opacity: 0;
            animation: reward-chip-in 0.4s ease-out forwards;
        }

        .icon-gradient-xp, .icon-gradient-coin, .icon-gradient-badge {
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            text-fill-color: transparent;
            font-size: 1.1em;
            filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
        }
        .icon-gradient-xp {
            background-image: linear-gradient(45deg, #fde047, #facc15); /* yellow-300 to yellow-500 */
        }
        .icon-gradient-coin {
            background-image: linear-gradient(45deg, #fbbf24, #f59e0b); /* amber-400 to amber-500 */
        }
        .icon-gradient-badge {
            background-image: linear-gradient(45deg, var(--accent-color), var(--primary-color));
        }
    `}</style>
    </div>
  );
};
