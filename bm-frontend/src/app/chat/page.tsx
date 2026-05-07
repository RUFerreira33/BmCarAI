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
  const [showArchitecture, setShowArchitecture] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);

  const recommendedIds = new Set(
    recommendedVehicles.map((vehicle) => vehicle.externalId),
  );

  const otherVehicles = vehicles.filter(
    (vehicle) => !recommendedIds.has(vehicle.externalId),
  );

  const handleSendMessage = async (message: string) => {
    if (isLoading) return;

    const userMessage: Message = {
      id: Date.now(),
      role: 'user',
      content: message,
    };

    setMessages([userMessage]);
    setVehicles([]);
    setRecommendedVehicles([]);
    setSelectedVehicle(null);
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
    <main className="relative bg-[#f3f4f6] pt-[89px]">
      <ChatHeader
        onToggleArchitecture={() => setShowArchitecture(!showArchitecture)}
      />

      {showArchitecture && (
        <div className="absolute right-36 top-24 z-40 w-[430px] rounded-xl border border-gray-200 bg-white p-5 shadow-lg">
          <h2 className="mb-3 text-lg font-bold text-gray-900">
            Arquitetura do Projeto
          </h2>

          <div className="space-y-2 text-sm text-gray-700">
            <p>
              <strong>Frontend:</strong> Next.js + React
            </p>
            <p>
              <strong>Backend:</strong> NestJS
            </p>
            <p>
              <strong>Base de Dados:</strong> PostgreSQL + Prisma ORM
            </p>
            <p>
              <strong>Inteligência Artificial:</strong> Ollama com modelo Llama 3
            </p>
            <p>
              <strong>Comunicação:</strong> API REST entre frontend e backend
            </p>
            <p>
              <strong>Objetivo:</strong> Sistema inteligente de pesquisa e
              recomendação de veículos.
            </p>
          </div>
        </div>
      )}

      {selectedVehicle && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-6">
          <div className="relative max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
            <button
              onClick={() => setSelectedVehicle(null)}
              className="absolute right-4 top-4 rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-700 hover:bg-gray-200"
            >
              X
            </button>

            {selectedVehicle.imageUrl && (
              <img
                src={selectedVehicle.imageUrl}
                alt={selectedVehicle.name}
                className="h-80 w-full rounded-t-3xl object-cover"
              />
            )}

            <div className="p-8">
              <p className="mb-2 text-sm font-semibold text-blue-600">
                Detalhes do veículo
              </p>

              <h2 className="text-3xl font-bold text-gray-900">
                {selectedVehicle.name}
              </h2>

              <p className="mt-4 text-4xl font-bold text-blue-600">
                {selectedVehicle.price.toLocaleString('pt-PT')} €
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Marca</p>
                  <p className="mt-1 font-semibold">{selectedVehicle.brand}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Modelo</p>
                  <p className="mt-1 font-semibold">{selectedVehicle.model}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Ano</p>
                  <p className="mt-1 font-semibold">{selectedVehicle.year}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Km</p>
                  <p className="mt-1 font-semibold">
                    {selectedVehicle.kilometers.toLocaleString('pt-PT')}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">
                    Combustível
                  </p>
                  <p className="mt-1 font-semibold">{selectedVehicle.fuel}</p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Potência</p>
                  <p className="mt-1 font-semibold">
                    {selectedVehicle.powerHp} cv
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Segmento</p>
                  <p className="mt-1 font-semibold">
                    {selectedVehicle.segment}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Tipo</p>
                  <p className="mt-1 font-semibold">
                    {selectedVehicle.vehicleType}
                  </p>
                </div>

                <div className="rounded-2xl bg-gray-50 p-4">
                  <p className="text-xs uppercase text-gray-400">Cilindrada</p>
                  <p className="mt-1 font-semibold">
                    {selectedVehicle.displacement} cc
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedVehicle(null)}
                className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Fechar detalhes
              </button>
            </div>
          </div>
        </div>
      )}

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
              <RecommendedVehicles
                vehicles={recommendedVehicles}
                onSelectVehicle={setSelectedVehicle}
              />

              <VehicleList
                vehicles={otherVehicles}
                onSelectVehicle={setSelectedVehicle}
              />
            </>
          )}
        </section>
      </div>
    </main>
  );
}