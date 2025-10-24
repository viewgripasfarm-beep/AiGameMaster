import React, { useState, useEffect } from 'react';
import * as authService from '../services/authService';

interface LeaderboardData {
    username: string;
    xp: number;
    avatar: string | null;
}

interface LeaderboardProps {
    isOpen: boolean;
    onClose: () => void;
    currentUser: string;
}

const RankIcon: React.FC<{ rank: number }> = ({ rank }) => {
    if (rank === 1) return <i className="fas fa-medal text-yellow-400 text-2xl" title="Hạng 1"></i>;
    if (rank === 2) return <i className="fas fa-medal text-gray-400 text-2xl" title="Hạng 2"></i>;
    if (rank === 3) return <i className="fas fa-medal text-yellow-600 text-2xl" title="Hạng 3"></i>;
    return <span className="font-bold text-lg text-text-muted w-8 text-center">{rank}</span>;
};

export const Leaderboard: React.FC<LeaderboardProps> = ({ isOpen, onClose, currentUser }) => {
    const [leaderboard, setLeaderboard] = useState<LeaderboardData[]>([]);

    useEffect(() => {
        if (isOpen) {
            const data = authService.getAllUsersData();
            setLeaderboard(data);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-black/70 z-40 flex items-center justify-center p-4 animate-fade-in-fast"
            onClick={onClose}
            role="dialog"
            aria-modal="true"
        >
            <div
                className="bg-surface1 rounded-2xl shadow-xl w-full max-w-lg h-[90vh] max-h-[600px] flex flex-col transform animate-scale-in"
                onClick={(e) => e.stopPropagation()}
            >
                <header className="flex items-center justify-between p-4 border-b border-border flex-shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-3">
                        <i className="fa-solid fa-trophy text-primary text-xl"></i>
                        <span>Bảng Xếp Hạng</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full text-text-muted hover:bg-surface2 hover:text-primary transition-colors"
                        aria-label="Đóng Bảng xếp hạng"
                    >
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </header>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {leaderboard.length > 0 ? (
                        leaderboard.map((user, index) => {
                            const isCurrentUser = user.username === currentUser;
                            const rank = index + 1;
                            return (
                                <div
                                    key={user.username}
                                    className={`flex items-center p-3 rounded-lg transition-all duration-300 ${isCurrentUser ? 'bg-primary/20 ring-2 ring-primary' : 'bg-surface2'}`}
                                >
                                    <div className="flex-shrink-0 w-10 text-center">
                                        <RankIcon rank={rank} />
                                    </div>
                                    <div className="flex items-center gap-3 ml-3 flex-1 truncate">
                                        <div className="w-10 h-10 rounded-full bg-surface1 flex items-center justify-center overflow-hidden shrink-0">
                                            {user.avatar ? (
                                                <img src={user.avatar} alt={user.username} className="w-full h-full object-cover" />
                                            ) : (
                                                <i className="fa-solid fa-user-astronaut text-primary text-2xl"></i>
                                            )}
                                        </div>
                                        <span className="font-semibold text-text truncate">{user.username}</span>
                                    </div>
                                    <div className="ml-auto text-right">
                                        <p className="font-bold text-lg text-accent">{user.xp.toLocaleString()} XP</p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="text-center p-8 text-text-muted">
                            <i className="fa-solid fa-ghost text-4xl mb-4"></i>
                            <p>Chưa có ai trên bảng xếp hạng.</p>
                            <p>Hãy là người đầu tiên!</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};