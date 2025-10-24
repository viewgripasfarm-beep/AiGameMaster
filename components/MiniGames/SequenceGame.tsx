
import React, { useState, useEffect, useMemo } from 'react';
import type { SequenceGame as SequenceGameData } from '../../types';

interface SequenceGameProps {
    game: SequenceGameData;
    onComplete: () => void;
}

const shuffleArray = (array: string[]) => {
    return [...array].sort(() => Math.random() - 0.5);
};

export const SequenceGame: React.FC<SequenceGameProps> = ({ game, onComplete }) => {
    const [items, setItems] = useState<string[]>([]);
    const [submitted, setSubmitted] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    const shuffledItems = useMemo(() => shuffleArray(game.items), [game.items]);

    useEffect(() => {
        setItems(shuffledItems);
        setSubmitted(false);
        setIsCorrect(false);
    }, [shuffledItems]);

    const moveItem = (index: number, direction: 'up' | 'down') => {
        if (submitted) return;
        const newItems = [...items];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;
        if (targetIndex < 0 || targetIndex >= newItems.length) return;
        [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
        setItems(newItems);
    };

    const checkAnswer = () => {
        const correct = items.every((item, index) => item === game.items[index]);
        setIsCorrect(correct);
        setSubmitted(true);
        if (correct) {
            onComplete();
        }
    };

    const resetGame = () => {
        setItems(shuffleArray(game.items));
        setSubmitted(false);
        setIsCorrect(false);
    };

    return (
        <div>
            <div className="space-y-2">
                {items.map((item, index) => (
                    <div key={index} className={`flex items-center gap-2 transition-all duration-300 p-2 rounded-md ${ submitted ? (isCorrect ? 'bg-success/10' : 'bg-red-500/10') : 'bg-surface2'}`}>
                        <div className="flex flex-col">
                            <button onClick={() => moveItem(index, 'up')} disabled={index === 0 || submitted} className="disabled:opacity-20 disabled:cursor-not-allowed text-text-muted hover:text-primary"><i className="fa-solid fa-caret-up"></i></button>
                            <button onClick={() => moveItem(index, 'down')} disabled={index === items.length - 1 || submitted} className="disabled:opacity-20 disabled:cursor-not-allowed text-text-muted hover:text-primary"><i className="fa-solid fa-caret-down"></i></button>
                        </div>
                        <span className="flex-1 text-text text-sm">{item}</span>
                    </div>
                ))}
            </div>

            <div className="mt-4 text-center">
                {submitted ? (
                    isCorrect ? (
                        <div className="p-3 bg-success/10 text-success rounded-lg">
                            <p className="font-bold uppercase">🎉 CHÍNH XÁC! BẠN GIỎI QUÁ! 🎉</p>
                             <button onClick={resetGame} className="mt-2 text-sm text-primary hover:underline font-semibold">CHƠI LẠI</button>
                        </div>
                    ) : (
                        <div className="p-3 bg-red-500/10 text-red-400 rounded-lg">
                            <p className="font-bold uppercase">😥 CHƯA ĐÚNG RỒI, CỐ LÊN! 😥</p>
                            <button onClick={resetGame} className="mt-2 text-sm text-primary hover:underline font-semibold">THỬ LẠI</button>
                        </div>
                    )
                ) : (
                    <button
                        onClick={checkAnswer}
                        className="px-6 py-2 bg-accent hover:opacity-90 text-white font-bold transition-colors uppercase tracking-wider rounded-full shadow-sm"
                    >
                        Kiểm tra
                    </button>
                )}
            </div>
        </div>
    );
};
