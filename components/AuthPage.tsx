import React, { useState } from 'react';
import { login, register, getLastUser } from '../services/authService';
import { Logo } from './Logo';

interface AuthPageProps {
    onLoginSuccess: (username: string) => void;
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const AuthPage: React.FC<AuthPageProps> = ({ onLoginSuccess, theme, toggleTheme }) => {
    const [isRegistering, setIsRegistering] = useState(false);
    const [username, setUsername] = useState(getLastUser() || '');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        if (isRegistering) {
            if (password !== confirmPassword) {
                setError('Mật khẩu xác nhận không khớp.');
                setIsLoading(false);
                return;
            }
            if (password.length < 6) {
                setError('Mật khẩu phải có ít nhất 6 ký tự.');
                setIsLoading(false);
                return;
            }
            const res = await register(username, password);
            if (res.success) {
                // Automatically log in after successful registration
                const loginRes = await login(username, password);
                if (loginRes.success) {
                    onLoginSuccess(username);
                } else {
                    setError(loginRes.message);
                }
            } else {
                setError(res.message);
            }
        } else {
            const res = await login(username, password);
            if (res.success) {
                onLoginSuccess(username);
            } else {
                setError(res.message);
            }
        }
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-bg text-text p-4">
            <div className="w-full max-w-md bg-surface1 p-8 rounded-2xl shadow-lg animate-fade-in-down">
                <div className="text-center mb-8">
                    <div className="inline-block mb-4">
                       <Logo />
                    </div>
                    <h1 className="text-3xl font-bold text-primary">Chào Mừng Đến Học Mà Chơi</h1>
                    <p className="text-text-muted mt-2">Đăng nhập hoặc đăng ký để bắt đầu cuộc phiêu lưu!</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1" htmlFor="username">Tên đăng nhập</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            className="w-full bg-surface2 border border-border py-2 px-3 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-text-muted mb-1" htmlFor="password">Mật khẩu</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full bg-surface2 border border-border py-2 px-3 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                        />
                    </div>
                    {isRegistering && (
                         <div>
                            <label className="block text-sm font-medium text-text-muted mb-1" htmlFor="confirmPassword">Xác nhận mật khẩu</label>
                            <input
                                id="confirmPassword"
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                                className="w-full bg-surface2 border border-border py-2 px-3 text-text placeholder-text-muted focus:outline-none focus:ring-2 focus:ring-primary rounded-md"
                            />
                        </div>
                    )}

                    {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-primary text-white font-bold py-3 rounded-md hover:opacity-90 transition-opacity disabled:bg-surface2 disabled:text-text-muted"
                    >
                        {isLoading ? <i className="fa-solid fa-spinner fa-spin"></i> : (isRegistering ? 'Đăng Ký' : 'Đăng Nhập')}
                    </button>
                </form>

                <div className="text-center mt-6">
                    <button onClick={() => { setIsRegistering(!isRegistering); setError(''); }} className="text-sm text-primary hover:underline">
                        {isRegistering ? 'Đã có tài khoản? Đăng nhập' : 'Chưa có tài khoản? Đăng ký ngay'}
                    </button>
                </div>
                
                 <div className="mt-6 border-t border-border pt-4">
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
                </div>
            </div>
             <style>{`
                @keyframes fade-in-down {
                    from { opacity: 0; transform: translateY(-20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fade-in-down {
                    animation: fade-in-down 0.5s ease-out forwards;
                }
            `}</style>
        </div>
    );
};