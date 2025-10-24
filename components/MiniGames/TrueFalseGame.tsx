
import React, { useState } from 'react';
import type { TrueFalseGame as TrueFalseGameData } from '../../types';

interface TrueFalseGameProps {
    game: TrueFalseGameData;
    onComplete: () => void;
}

export const TrueFalseGame: React.FC<TrueFalseGameProps> = ({ game, onComplete }) => {
    const [answers, setAnswers] = useState<Record<number, boolean | null>>({});
    const [submitted, setSubmitted] = useState(false);

    const handleAnswer = (index: number, answer: boolean) => {
        if (submitted) return;
        setAnswers(prev => ({ ...prev, [index]: answer }));
    };
    
    const handleSubmit = () => {
        setSubmitted(true);
        const score = calculateScore();
        if (score === game.statements.length) {
            onComplete();
        }
    }

    const getButtonClasses = (index: number, buttonValue: boolean) => {
        const userAnswer = answers[index];
        const correctAnswer = game.statements[index].isTrue;

        if (!submitted) {
            return userAnswer === buttonValue ? 'bg-accent/80 text-white' : 'bg-surface2 hover:bg-border';
        }
        
        if (correctAnswer === buttonValue) {
            return 'bg-success text-white';
        }
        
        if (userAnswer === buttonValue && userAnswer !== correctAnswer) {
            return 'bg-red-500 text-white';
        }

        return 'bg-surface2 text-text-muted';
    };

    const calculateScore = () => {
        return game.statements.reduce((score, statement, i) => {
            return answers[i] === statement.isTrue ? score + 1 : score;
        }, 0);
    };

    const resetGame = () => {
        setSubmitted(false);
        setAnswers({});
    };

    return (
        <div>
            <div className="space-y-3">
                {game.statements.map((statement, index) => (
                    <div key={index} className="p-3 bg-surface1 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-2">
                        <p className="flex-1 text-text text-sm text-center sm:text-left">{statement.text}</p>
                        <div className="flex gap-2 shrink-0">
                            <button 
                                onClick={() => handleAnswer(index, true)} 
                                disabled={submitted}
                                className={`w-20 py-1.5 rounded-md font-semibold transition-colors ${getButtonClasses(index, true)}`}
                            >
                                Đúng
                            </button>
                            <button 
                                onClick={() => handleAnswer(index, false)} 
                                disabled={submitted}
                                className={`w-20 py-1.5 rounded-md font-semibold transition-colors ${getButtonClasses(index, false)}`}
                            >
                                Sai
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-6 text-center">
                 {submitted ? (
                     <div className={`p-3 rounded-lg ${calculateScore() === game.statements.length ? 'bg-success/10 text-success' : 'bg-red-500/10 text-red-400'}`}>
                        <p className="font-bold uppercase">BẠN ĐÚNG {calculateScore()}/{game.statements.length} CÂU! {calculateScore() === game.statements.length ? '🎉' : '💪'}</p>
                        <button onClick={resetGame} className="mt-2 text-sm text-primary hover:underline font-semibold">THỬ LẠI</button>
                    </div>
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(answers).length !== game.statements.length}
                        className="px-6 py-2 bg-accent hover:opacity-90 text-white font-bold transition-colors uppercase tracking-wider rounded-full shadow-sm disabled:bg-surface2 disabled:text-text-muted disabled:cursor-not-allowed"
                    >
                        Kiểm tra
                    </button>
                )}
            </div>
        </div>
    );
};
