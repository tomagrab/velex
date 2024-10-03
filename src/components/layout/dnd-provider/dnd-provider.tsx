'use-client';

import { DndProvider } from 'react-dnd';
import { TouchBackend } from 'react-dnd-touch-backend';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { isMobile } from 'react-device-detect';

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="absolute h-[100dvh] w-[100vw]">
      <DndProvider backend={isMobile ? TouchBackend : HTML5Backend}>
        {children}
      </DndProvider>
    </div>
  );
}
