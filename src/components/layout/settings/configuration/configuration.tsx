'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Appearance from '@/components/layout/settings/configuration/appearance/appearance';

export default function Configuration() {
  const [colorMode, setColorMode] = useState<'dark' | 'light' | 'system'>(
    'system',
  );

  useEffect(() => {
    // Fetch color mode from the cookie via API
    const fetchColorMode = async () => {
      const response = await fetch('/api/get-color-mode');
      const data = await response.json();
      setColorMode(data.colorMode || 'system');
      applyColorMode(data.colorMode || 'system');
    };

    fetchColorMode();
  }, []);

  const applyColorMode = (mode: 'dark' | 'light' | 'system') => {
    if (mode === 'system') {
      const systemPrefersDark = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches;
      document.body.classList.toggle('dark', systemPrefersDark);
    } else {
      document.body.classList.toggle('dark', mode === 'dark');
    }
  };

  const handleModeChange = async (mode: 'dark' | 'light' | 'system') => {
    setColorMode(mode);
    applyColorMode(mode);

    // Update the cookie on the server
    await fetch('/api/set-color-mode', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ colorMode: mode }),
    });
  };

  return (
    <div>
      <div>
        <Tabs defaultValue="appearance" className="w-full">
          <TabsList>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
            <TabsTrigger value="other-settings">Other Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="appearance">
            <Appearance
              colorMode={colorMode}
              handleModeChange={handleModeChange}
            />
          </TabsContent>
          <TabsContent value="other-settings">
            <p>Other settings content goes here.</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
