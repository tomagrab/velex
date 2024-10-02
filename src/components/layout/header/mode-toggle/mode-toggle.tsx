'use client';

import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  // Sync initial state with the body's current class on mount
  useEffect(() => {
    setIsDarkMode(document.body.classList.contains('dark'));
  }, []);

  function toggleDarkMode() {
    document.body.classList.toggle('dark');
    setIsDarkMode(!isDarkMode);
    setIsClicked(true); // Set clicked state to trigger animation

    // Reset the click state after animation duration (e.g., 500ms)
    setTimeout(() => setIsClicked(false), 500);
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
