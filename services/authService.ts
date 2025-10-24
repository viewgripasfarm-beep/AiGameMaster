// A very simple mock auth service using localStorage
// In a real app, this would be an API call to a backend.

const USERS_KEY = 'hoc-ma-choi-users';
const CURRENT_USER_KEY = 'hoc-ma-choi-currentUser';
const LAST_USER_KEY = 'hoc-ma-choi-lastUser';
const USER_DATA_PREFIX = 'userData_';

export interface UserData {
  avatar: string | null;
  streak: number;
  lastCompletedDate: string | null;
  theme: 'light' | 'dark' | null;
  xp: number;
}

const defaultUserData: UserData = {
    avatar: null,
    streak: 0,
    lastCompletedDate: null,
    theme: null,
    xp: 0,
};

// Internal helper to get all data for a user
const getUserData = (username: string): UserData => {
    const data = localStorage.getItem(`${USER_DATA_PREFIX}${username}`);
    const parsedData = data ? JSON.parse(data) : {};
    return { ...defaultUserData, ...parsedData };
};

// Internal helper to update data for a user
const updateUserData = (username: string, partialData: Partial<UserData>) => {
    const existingData = getUserData(username);
    const newData = { ...existingData, ...partialData };
    localStorage.setItem(`${USER_DATA_PREFIX}${username}`, JSON.stringify(newData));
};


// Simple base64 "hashing" for demonstration
const hashPassword = (password: string): string => btoa(password);

const getUsers = (): Record<string, string> => {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : {};
};

const saveUsers = (users: Record<string, string>) => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const saveLastUser = (username: string) => {
    localStorage.setItem(LAST_USER_KEY, username);
};

export const register = (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => { // Simulate network delay
            const users = getUsers();
            if (users[username]) {
                resolve({ success: false, message: 'Tên đăng nhập đã tồn tại.' });
            } else {
                users[username] = hashPassword(password);
                saveUsers(users);
                resolve({ success: true, message: 'Đăng ký thành công!' });
            }
        }, 500);
    });
};

export const login = (username: string, password: string): Promise<{ success: boolean; message: string }> => {
    return new Promise((resolve) => {
        setTimeout(() => { // Simulate network delay
            const users = getUsers();
            if (users[username] && users[username] === hashPassword(password)) {
                localStorage.setItem(CURRENT_USER_KEY, username);
                saveLastUser(username);
                resolve({ success: true, message: 'Đăng nhập thành công!' });
            } else {
                resolve({ success: false, message: 'Sai tên đăng nhập hoặc mật khẩu.' });
            }
        }, 500);
    });
};

export const logout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
};

export const getCurrentUser = (): string | null => {
    return localStorage.getItem(CURRENT_USER_KEY);
};

export const getLastUser = (): string | null => {
    return localStorage.getItem(LAST_USER_KEY);
};

export const saveAvatar = (username: string, avatarDataUrl: string) => {
    updateUserData(username, { avatar: avatarDataUrl });
};

export const getAvatar = (username: string): string | null => {
    return getUserData(username).avatar;
};

export const saveStreak = (username: string, streak: number, lastCompletedDate: string | null) => {
    updateUserData(username, { streak, lastCompletedDate });
};

export const getStreak = (username: string): { streak: number; lastCompletedDate: string | null } => {
    const data = getUserData(username);
    return { streak: data.streak, lastCompletedDate: data.lastCompletedDate };
};

export const saveThemeForUser = (username: string, theme: 'light' | 'dark') => {
    updateUserData(username, { theme });
}

export const getThemeForUser = (username: string): 'light' | 'dark' | null => {
    return getUserData(username).theme;
}

export const addXp = (username: string, xpToAdd: number) => {
    const userData = getUserData(username);
    const newXp = (userData.xp || 0) + xpToAdd;
    updateUserData(username, { xp: newXp });
};

export const getAllUsersData = (): Array<{ username: string; xp: number; avatar: string | null; }> => {
    const users = getUsers();
    const usernames = Object.keys(users);
    
    const allData = usernames.map(username => {
        const userData = getUserData(username);
        return {
            username,
            xp: userData.xp || 0,
            avatar: userData.avatar || null,
        };
    });

    return allData.sort((a, b) => b.xp - a.xp);
};