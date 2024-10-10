'use client';

import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Appearance from '@/components/layout/settings/configuration/appearance/appearance';
import {
  getColorModeFromCookie,
  setColorMode,
  applyColorMode,
} from '@/lib/utilities/layout/header/header-right/color-mode-utility/color-mode-utility';

export default function Configuration() {
  const [colorMode, setColorModeState] = useState<'dark' | 'light' | 'system'>(
    'system',
  );

  useEffect(() => {
    // Fetch color mode from the cookie via API
    getColorModeFromCookie().then(mode => {
      setColorModeState(mode as 'dark' | 'light' | 'system');
      applyColorMode(mode as 'dark' | 'light' | 'system');
    });
  }, []);

  const handleModeChange = async (mode: 'dark' | 'light' | 'system') => {
    setColorModeState(mode);
    await setColorMode(mode);
  };

  return (
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
  );
}
