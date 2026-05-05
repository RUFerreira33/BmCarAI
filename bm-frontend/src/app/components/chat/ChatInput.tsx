'use client';

import { FormEvent, useRef, useState } from 'react';

type ChatInputProps = {
  onSendMessage: (message: string) => void;
  isLoading?: boolean;
};

export default function ChatInput({
  onSendMessage,
  isLoading = false,
}: ChatInputProps) {
  const [message, setMessage] = useState('');
  const isSubmittingRef = useRef(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmittingRef.current || isLoading) return;

    const trimmedMessage = message.trim();

    if (!trimmedMessage) return;

    isSubmittingRef.current = true;

    console.log('CHAT INPUT SUBMIT:', trimmedMessage);

    onSendMessage(trimmedMessage);
    setMessage('');

    setTimeout(() => {
      isSubmittingRef.current = false;
    }, 300);
  };

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ex.: Quero um BMW até 20 000€, automático e a gasolina"
          disabled={isLoading}
          className="flex-1 rounded-2xl border border-gray-300 px-4 py-3 outline-none disabled:cursor-not-allowed disabled:bg-gray-100"
        />

        <button
          type="submit"
          disabled={isLoading}
          className="rounded-2xl bg-blue-600 px-6 py-3 font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-300"
        >
          {isLoading ? 'A analisar...' : 'Enviar'}
        </button>
      </form>
    </div>
  );
}