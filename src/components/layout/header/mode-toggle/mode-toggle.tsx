'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Sync initial state based on localStorage or system preference
  useEffect(() => {
    const localStorageDarkMode = localStorage.getItem('darkMode');

    // If user has a stored preference in localStorage, use that
    if (localStorageDarkMode) {
      setIsDarkMode(JSON.parse(localStorageDarkMode));
      if (JSON.parse(localStorageDarkMode)) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    } else {
      // Otherwise, check system preference
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      setIsDarkMode(systemPrefersDark);
      if (systemPrefersDark) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }, []);

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    const newDarkModeState = !isDarkMode;
    setIsDarkMode(newDarkModeState);

    // Save the user's preference to local storage
    localStorage.setItem('darkMode', JSON.stringify(newDarkModeState));

    setIsClicked(true); // Set clicked state to trigger animation

    // Reset the click state after animation duration (e.g., 500ms)
    setTimeout(() => setIsClicked(false), 250);
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="flex items-center justify-center p-2"
    >
      {isDarkMode ? (
        <Sun
          size={32}
          className={`transform transition-transform duration-500 ease-in-out ${
            isClicked ? 'motion-safe:rotate-180 motion-safe:scale-125' : ''
          } hover:motion-safe:scale-110`}
        />
      ) : (
        <Moon
          size={32}
          className={`transform transition-transform duration-500 ease-in-out ${
            isClicked ? 'motion-safe:scale-125' : ''
          } hover:motion-safe:scale-110`}
        />
      )}
    </button>
  );
}
