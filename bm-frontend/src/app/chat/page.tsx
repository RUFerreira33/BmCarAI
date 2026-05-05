'use client';

import { useState } from 'react';
import ChatContainer from '../components/chat/ChatContainer';
import ChatHeader from '../components/chat/ChatHeader';
import ChatInput from '../components/chat/ChatInput';
import VehicleList from '../components/vehicles/VehicleList';
import RecommendedVehicles from '../components/vehicles/RecommendedVehicles';
import { searchVehicles } from '../services/chat.service';
import ResultsLoading from '../components/vehicles/ResultsLoading';

type Message = {
  id: number;
  role: 'user' | 'assistant';
  content: string;
};

type Vehicle = {
  externalId: string;
  name: string;
  slug: string;
  brand: string;
  model: string;
  vehicleType: string;
  segment: string;
  price: number;
  priceOriginal: number;
  kilometers: number;
  year: number;
  powerHp: number;
  fuel: string;
  displacement: number;
  isNew: boolean;
  imageUrl?: string;
};

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [recommendedVehicles, setRecommendedVehicles] = useState<Vehicle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const recommendedIds = new Set(
    recommendedVehicles.map((vehicle) => vehicle.externalId),
  );

  const otherVehicles = vehicles.filter(
    (vehicle) => !recommendedIds.has(vehicle.externalId),
  );

  const handleSendMessage = async (message: string) => {
    if(isLoading) return;

    console.log('HANDLE SEND MESSAGE:', message);

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: message,
    };

    setMessages([userMessage]);
    setVehicles([]);
    setRecommendedVehicles([]);
    setIsLoading(true);


    try {
      const data = await searchVehicles(message);

      setVehicles(data.resultados ?? []);
      setRecommendedVehicles(data.recomendados ?? []);

      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: `Encontrei ${data.totalResultados} veículos e selecionei ${data.totalRecomendados} recomendados para ti.`,
      };

      setMessages((previous) => [...previous, assistantMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: 'assistant',
        content: 'Ocorreu um erro ao comunicar com o backend.',
      };

      setMessages((previous) => [...previous, errorMessage]);
      console.error(error);
    } finally {
      setIsLoading(false);
    }

  };

  return (
    <main className="bg-[#f3f4f6] pt-[89px]">
      <ChatHeader />

      <div className="flex h-[calc(100vh-89px)]">
        <section className="flex w-[38%] flex-col border-r border-gray-200 bg-gray-100">
          <ChatContainer messages={messages} isLoading={isLoading} />
          <ChatInput
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </section>

        <section className="w-[62%] overflow-y-auto bg-[#f8fafc] p-4">
          {isLoading ? (
            <ResultsLoading />
          ) : (
            <>
              <RecommendedVehicles vehicles={recommendedVehicles} />
              <VehicleList vehicles={otherVehicles} />
            </>
          )}
        </section>
      </div>
    </main>
  );
}