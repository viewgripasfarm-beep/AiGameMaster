import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AuthPage } from './components/AuthPage';
import * as authService from './services/authService';

type Theme = 'light' | 'dark';

const Main = () => {
  const [currentUser, setCurrentUser] = useState<string | null>(authService.getCurrentUser());
  const [theme, setTheme] = useState<Theme>('dark'); // Default before hydration

  // Effect for setting initial theme and listening to system changes
  useEffect(() => {
    // This is for non-logged-in users (e.g., on AuthPage)
    const savedGlobalTheme = localStorage.getItem('theme') as Theme | null;
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    const applyInitialTheme = () => {
      let initialTheme: Theme | null = null;
      if (currentUser) {
        initialTheme = authService.getThemeForUser(currentUser);
      }
      
      if (initialTheme) {
        setTheme(initialTheme);
      } else if (savedGlobalTheme) {
        setTheme(savedGlobalTheme);
      } else {
        setTheme(mediaQuery.matches ? 'dark' : 'light');
      }
    };

    const handleSystemThemeChange = (e: MediaQueryListEvent) => {
      // Only change if no theme is explicitly saved by the user (globally or per-user)
      const userTheme = currentUser ? authService.getThemeForUser(currentUser) : null;
      if (!userTheme && !localStorage.getItem('theme')) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    applyInitialTheme();
    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [currentUser]);

  // Effect to apply the theme class to the document
  useEffect(() => {
    if (theme === 'light') {
      document.documentElement.classList.add('light');
    } else {
      document.documentElement.classList.remove('light');
    }
  }, [theme]);
  
  // This function now also saves the user's explicit choice
  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);

    if (currentUser) {
        authService.saveThemeForUser(currentUser, newTheme);
    }
    // Always save globally for AuthPage and for next non-logged-in session
    localStorage.setItem('theme', newTheme);
  };

  const handleLoginSuccess = (username: string) => {
    setCurrentUser(username);
  };

  const handleLogout = () => {
    authService.logout();
    setCurrentUser(null);
  };

  if (!currentUser) {
    return <AuthPage onLoginSuccess={handleLoginSuccess} theme={theme} toggleTheme={toggleTheme} />;
  }

  return <App currentUser={currentUser} onLogout={handleLogout} theme={theme} toggleTheme={toggleTheme} />;
};


const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);