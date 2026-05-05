'use client';

import { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

type ChatContainerProps = {
  messages: Message[];
  isLoading?: boolean;
};

export default function ChatContainer({
  messages,
  isLoading = false,
}: ChatContainerProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6">
      {messages.length === 0 ? (
        <p className="text-center text-gray-500">
          Começa por escrever o BMW que procuras.
        </p>
      ) : (
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-4">
          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              role={message.role}
              content={message.content}
            />
          ))}

          {isLoading && (
            <ChatMessage
              role="assistant"
              content="Estou a analisar o teu pedido..."
            />
          )}

          <div ref={bottomRef} />
        </div>
      )}
    </div>
  );
}