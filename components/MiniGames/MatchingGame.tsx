
import React, { useState, useMemo, useEffect } from 'react';
import type { MatchingGame as MatchingGameData } from '../../types';

interface MatchingGameProps {
    game: MatchingGameData;
    onComplete: () => void;
}

const shuffleArray = (array: any[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const MatchingGame: React.FC<MatchingGameProps> = ({ game, onComplete }) => {
    const [selectedPrompt, setSelectedPrompt] = useState<number | null>(null);
    const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
    const [pairs, setPairs] = useState<Record<number, number>>({});
    const [submitted, setSubmitted] = useState(false);

    const shuffledAnswers = useMemo(() => {
        const answerMap = game.answers.map((answer, index) => ({ answer, originalIndex: index }));
        return shuffleArray(answerMap);
    }, [game]);

    useEffect(() => {
        if (selectedPrompt !== null && selectedAnswer !== null) {
            const newPairs = { ...pairs, [selectedPrompt]: selectedAnswer };
            setPairs(newPairs);
            setSelectedPrompt(null);
            setSelectedAnswer(null);
        }
    }, [selectedPrompt, selectedAnswer, pairs]);

    const handlePromptClick = (index: number) => {
        if (submitted || pairs[index] !== undefined) return;
        setSelectedPrompt(index);
    };

    const handleAnswerClick = (shuffledIndex: number) => {
        if (submitted || Object.values(pairs).includes(shuffledIndex)) return;
        setSelectedAnswer(shuffledIndex);
    };
    
    const checkIsCorrect = () => {
        if (Object.keys(pairs).length !== game.prompts.length) return false;
        for (const promptIndex in pairs) {
            const answerShuffledIndex = pairs[promptIndex];
            const originalAnswerIndex = shuffledAnswers[answerShuffledIndex].originalIndex;
            if (parseInt(promptIndex) !== originalAnswerIndex) {
                return false;
            }
        }
        return true;
    };
    
    const isCorrect = submitted && checkIsCorrect();

    const handleSubmit = () => {
        setSubmitted(true);
        if(checkIsCorrect()) {
            onComplete();
        }
    }

    const resetGame = () => {
        setSelectedPrompt(null);
        setSelectedAnswer(null);
        setPairs({});
        setSubmitted(false);
    };

    const getPromptClasses = (index: number) => {
        if (selectedPrompt === index) return 'bg-accent/30 ring-2 ring-accent';
        if (pairs[index] !== undefined) {
             if (submitted) {
                const answerShuffledIndex = pairs[index];
                const originalAnswerIndex = shuffledAnswers[answerShuffledIndex].originalIndex;
                return index === originalAnswerIndex ? 'bg-success/20 text-text' : 'bg-red-500/20 text-text';
             }
             return 'bg-primary/20 text-text-muted';
        }
        return 'bg-surface2 hover:bg-border';
    };
    
    const getAnswerClasses = (index: number) => {
        if (selectedAnswer === index) return 'bg-accent/30 ring-2 ring-accent';
        if (Object.values(pairs).includes(index)) {
             if (submitted) {
                 const promptIndex = Object.keys(pairs).find(p => pairs[parseInt(p)] === index);
                 if (promptIndex !== undefined) {
                    const originalAnswerIndex = shuffledAnswers[index].originalIndex;
                    return parseInt(promptIndex) === originalAnswerIndex ? 'bg-success/20 text-text' : 'bg-red-500/20 text-text';
                 }
             }
             return 'bg-primary/20 text-text-muted';
        }
        return 'bg-surface2 hover:bg-border';
    };

    return (
        <div>
            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    {game.prompts.map((prompt, index) => (
                        <button
                            key={`prompt-${index}`}
                            onClick={() => handlePromptClick(index)}
                            disabled={submitted || pairs[index] !== undefined}
                            className={`w-full p-3 text-left text-sm rounded-md transition-all ${getPromptClasses(index)}`}
                        >
                            {prompt}
                        </button>
                    ))}
                </div>
                <div className="space-y-2">
                    {shuffledAnswers.map(({ answer }, index) => (
                        <button
                            key={`answer-${index}`}
                            onClick={() => handleAnswerClick(index)}
                            disabled={submitted || Object.values(pairs).includes(index)}
                            className={`w-full p-3 text-left text-sm rounded-md transition-all ${getAnswerClasses(index)}`}
                        >
                            {answer}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 text-center">
                 {submitted ? (
                    isCorrect ? (
                        <div className="p-3 bg-success/10 text-success rounded-lg">
                            <p className="font-bold uppercase">🎉 QUÁ ĐỈNH! BẠN ĐÃ NỐI ĐÚNG HẾT! 🎉</p>
                             <button onClick={resetGame} className="mt-2 text-sm text-primary hover:underline font-semibold">CHƠI LẠI</button>
                        </div>
                    ) : (
                        <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
                            <p className="font-bold uppercase">😥 CHƯA ĐÚNG RỒI, CỐ LÊN BẠN ƠI! 😥</p>
                            <button onClick={resetGame} className="mt-2 text-sm text-primary hover:underline font-semibold">THỬ LẠI</button>
                        </div>
                    )
                ) : (
                    <button
                        onClick={handleSubmit}
                        disabled={Object.keys(pairs).length !== game.prompts.length}
                        className="px-6 py-2 bg-accent hover:opacity-90 text-white font-bold transition-colors uppercase tracking-wider rounded-full shadow-sm disabled:bg-surface2 disabled:text-text-muted disabled:cursor-not-allowed"
                    >
                        Kiểm tra
                    </button>
                )}
            </div>
        </div>
    );
};
