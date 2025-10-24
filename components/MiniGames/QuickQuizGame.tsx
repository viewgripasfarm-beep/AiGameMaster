
import React, { useState } from 'react';
import type { QuickQuizGame as QuickQuizGameData, QuizQuestion } from '../../types';

interface QuickQuizGameProps {
    game: QuickQuizGameData;
    onComplete: () => void;
}

export const QuickQuizGame: React.FC<QuickQuizGameProps> = ({ game, onComplete }) => {
  const [answers, setAnswers] = useState<Record<number, string | null>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectAnswer = (questionIndex: number, option: string) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [questionIndex]: option }));
  };
  
  const handleSubmit = () => {
    setSubmitted(true);
    const score = calculateScore();
    if (score === game.questions.length) {
        onComplete();
    }
  }

  const getOptionClasses = (questionIndex: number, option: string, correctAnswer: string) => {
    if (!submitted) {
      return answers[questionIndex] === option
        ? 'bg-accent/80 text-white ring-2 ring-accent'
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
    return game.questions.reduce((score, q, i) => {
        return answers[i] === q.correctAnswer ? score + 1 : score;
    }, 0)
  }

  const resetGame = () => {
    setSubmitted(false);
    setAnswers({});
  };

  return (
    <div>
      <div className="space-y-4">
        {game.questions.map((q, i) => (
          <div key={i}>
            <p className="text-text mb-2 text-sm">{q.question}</p>
            <div className="grid grid-cols-1 gap-2">
              {q.options.map((opt, j) => (
                <button
                  key={j}
                  onClick={() => handleSelectAnswer(i, opt)}
                  disabled={submitted}
                  className={`p-2 text-left transition-all text-xs rounded-md ${getOptionClasses(i, opt, q.correctAnswer)}`}
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
            <div className={`p-3 rounded-lg ${calculateScore() === game.questions.length ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-400'}`}>
                <p className="font-bold uppercase">BẠN ĐÚNG {calculateScore()}/{game.questions.length} CÂU! {calculateScore() === game.questions.length ? '🎉' : '💪'}</p>
                <button onClick={resetGame} className="mt-2 text-sm text-primary hover:underline font-semibold">LÀM LẠI</button>
            </div>
        ) : (
            <button
              onClick={handleSubmit}
              disabled={Object.keys(answers).length !== game.questions.length}
              className="px-6 py-2 bg-accent hover:opacity-90 text-white font-bold disabled:bg-surface2 disabled:text-text-muted disabled:cursor-not-allowed transition-colors uppercase tracking-wider rounded-full shadow-sm"
            >
              Nộp bài
            </button>
        )}
      </div>
    </div>
  );
};
