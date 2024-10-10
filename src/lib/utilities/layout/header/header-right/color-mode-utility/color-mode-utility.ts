import { CustomError } from '@/lib/interfaces/utilities/custom-error/custom-error';
import { ColorMode } from '@/lib/types/layout/header/header-right/color-mode-utility/mode';

export const getColorModeFromCookie = async (): Promise<string> => {
  try {
    const response = await fetch('/api/get-color-mode');
    const data = await response.json();
    return data.colorMode || 'system';
  } catch {
    return 'system';
  }
};

export const applyColorMode = (colorMode: ColorMode) => {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  switch (colorMode) {
    case 'dark':
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      break;
    case 'light':
      document.body.classList.remove('dark');
      document.body.classList.add('light');
      break;
    case 'system':
      switch (prefersDark) {
        case true:
          document.body.classList.remove('light');
          document.body.classList.add('dark');
          break;
        case false:
          document.body.classList.remove('dark');
          document.body.classList.add('light');
          break;
      }
      break;

    default:
      // Default to dark colorMode: ColorMode
      document.body.classList.remove('light');
      document.body.classList.add('dark');
      break;
  }
};

export const determineAndApplyColorMode = () => {
  getColorModeFromCookie().then(colorMode => {
    applyColorMode(colorMode as ColorMode);

    // If no cookie exists, and it's a first-time user, set the system preference as the default
    if (colorMode === 'system') {
      const prefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      const initialMode = prefersDark ? 'dark' : 'light';

      // Set the initial cookie to 'system', if not already set
      setColorMode(initialMode as ColorMode);
    }
  });
};

export const setColorMode = async (colorMode: ColorMode) => {
  try {
    await fetch('/api/set-color-mode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ colorMode }),
    });

    applyColorMode(colorMode);
  } catch (error) {
    const customError = error as CustomError;

    console.error(customError.message);
  }
};
