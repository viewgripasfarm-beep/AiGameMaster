
import React from 'react';
import type { MiniGame } from '../../types';
import { SequenceGame } from './SequenceGame';
import { MatchingGame } from './MatchingGame';
import { TrueFalseGame } from './TrueFalseGame';
import { QuickQuizGame } from './QuickQuizGame';

interface MiniGameHostProps {
    game: MiniGame;
    onComplete: () => void;
}

const getGameIcon = (type: MiniGame['type']) => {
    switch (type) {
        case 'sequence': return 'fa-solid fa-arrow-down-1-9';
        case 'matching': return 'fa-solid fa-link';
        case 'true_false': return 'fa-solid fa-check-double';
        case 'quick_quiz': return 'fa-solid fa-bolt-lightning';
        default: return 'fa-solid fa-gamepad';
    }
}

export const MiniGameHost: React.FC<MiniGameHostProps> = ({ game, onComplete }) => {
    
    const renderGame = () => {
        switch (game.type) {
            case 'sequence':
                return <SequenceGame game={game} onComplete={onComplete} />;
            case 'matching':
                return <MatchingGame game={game} onComplete={onComplete} />;
            case 'true_false':
                return <TrueFalseGame game={game} onComplete={onComplete} />;
            case 'quick_quiz':
                 return <QuickQuizGame game={game} onComplete={onComplete} />;
            default:
                return <p>Lỗi: Không tìm thấy loại mini game.</p>;
        }
    }

    return (
        <div className="border-t border-b border-border my-4 py-4">
             <h4 className="font-bold text-lg text-accent mb-1 uppercase tracking-wider flex items-center gap-2">
                <i className={getGameIcon(game.type)}></i>
                <span>{game.title}</span>
            </h4>
            <p className="text-text-muted text-sm mb-4">{game.instructions}</p>
            {renderGame()}
        </div>
    )
};
