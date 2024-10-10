import { Button } from '@/components/ui/button';
import { Check, Computer, Moon, Sun } from 'lucide-react';

type AppearanceProps = {
  colorMode: 'dark' | 'light' | 'system';
  handleModeChange: (mode: 'dark' | 'light' | 'system') => Promise<void>;
};

export default function Appearance({
  colorMode,
  handleModeChange,
}: AppearanceProps) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="text-lg font-medium">Theme</h3>
      <div className="items-cemter flex gap-4">
        <Button
          onClick={() => handleModeChange('dark')}
          className={`flex items-center gap-2 p-2`}
        >
          <Moon /> Dark {colorMode === 'dark' ? <Check /> : null}
        </Button>
        <Button
          onClick={() => handleModeChange('light')}
          className={`flex items-center gap-2 p-2`}
        >
          <Sun /> Light {colorMode === 'light' ? <Check /> : null}
        </Button>
        <Button
          onClick={() => handleModeChange('system')}
          className={`flex items-center gap-2 p-2`}
        >
          <Computer /> System
          {colorMode === 'system' ? <Check /> : null}
        </Button>
      </div>
    </div>
  );
}
