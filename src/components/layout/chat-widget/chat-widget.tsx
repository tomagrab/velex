'use client';

import React, { useState } from 'react';
import { MessageCircle, Minus } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import UserMessage from '@/components/layout/chat-widget/user-message/user-message';
import AgentMessage from '@/components/layout/chat-widget/agent-message/agent-message';
import { useDrag } from 'react-dnd';
import { ItemType } from '@/lib/types/layout/chat-widget/item-type';

interface DragItem {
  type: string;
  position: { x: number; y: number };
}

interface CollectedProps {
  isDragging: boolean;
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  // Initial position
  const [position, setPosition] = useState({
    x: 20,
    y: window.innerHeight - 100,
  });

  // Drag logic for the closed widget
  const [{ isDragging }, dragRef] = useDrag<DragItem, unknown, CollectedProps>(
    () => ({
      type: ItemType.CHAT_WIDGET,
      item: { type: ItemType.CHAT_WIDGET, position },
      collect: monitor => ({
        isDragging: monitor.isDragging(),
      }),
      end: (item, monitor) => {
        const offset = monitor.getDifferenceFromInitialOffset();
        if (offset) {
          setPosition(prevPosition => ({
            x: prevPosition.x + offset.x,
            y: prevPosition.y + offset.y,
          }));
        }
      },
    }),
    [position],
  );

  // For the header when open
  const [, dragHeaderRef] = useDrag<DragItem, unknown, unknown>(
    () => ({
      type: ItemType.CHAT_WIDGET,
      item: { type: ItemType.CHAT_WIDGET, position },
      collect: () => ({}),
      end: (item, monitor) => {
        const offset = monitor.getDifferenceFromInitialOffset();
        if (offset) {
          setPosition(prevPosition => ({
            x: prevPosition.x + offset.x,
            y: prevPosition.y + offset.y,
          }));
        }
      },
    }),
    [position],
  );

  // Style adjustments when dragging
  const widgetStyle = {
    position: 'absolute',
    zIndex: 1000,
    transform: `translate(${position.x}px, ${position.y}px)`,
    opacity: isDragging ? 0.8 : 1,
    cursor: isDragging ? 'grabbing' : 'default',
  } as React.CSSProperties;

  return (
    <div
      ref={!isOpen ? dragRef : undefined} // Use dragRef here
      onClick={() => {
        if (!isOpen) {
          setIsOpen(true);
        }
      }}
      className={cn(
        isOpen
          ? 'h-96 w-80 sm:h-[32rem] sm:w-96'
          : 'h-16 w-16 rounded-full sm:h-20 sm:w-20',
        'bg-blue-600 text-white',
        'transition-all duration-300',
        'shadow-lg',
        'overflow-hidden',
      )}
      style={widgetStyle}
    >
      {/* Closed State */}
      {!isOpen && (
        <div className="flex h-full w-full items-center justify-center">
          <MessageCircle size={24} />
        </div>
      )}

      {/* Open State */}
      {isOpen && (
        <div
          className="flex h-full w-full flex-col rounded-lg bg-white shadow-lg"
          style={{ cursor: isDragging ? 'grabbing' : 'default' }}
        >
          {/* Header */}
          <div
            ref={dragHeaderRef} // Use dragHeaderRef here
            className="flex items-center justify-between bg-blue-600 px-4 py-2 text-white"
            style={{ cursor: 'grab', userSelect: 'none' }}
          >
            <h2 className="text-lg font-semibold">Chat Support</h2>
            <button
              onClick={e => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              className="focus:outline-none"
            >
              <Minus size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="flex flex-1 flex-col space-y-4 overflow-y-auto p-4">
            <UserMessage message="Hello, I need help." />
            <AgentMessage message="Sure, how can I assist you?" />
          </div>

          {/* Footer */}
          <div className="border-t p-2">
            <div className="flex items-center space-x-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button>Send</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
