type ChatHeaderProps = {
  onToggleArchitecture: () => void;
};

export default function ChatHeader({ onToggleArchitecture }: ChatHeaderProps) {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-gray-200 bg-white px-6 py-5 shadow-sm">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            BMCar AI Assistant
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Encontra o BMW certo com recomendações inteligentes.
          </p>
        </div>

        <button
          onClick={onToggleArchitecture}
          className="rounded-lg bg-blue-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          Ver Arquitetura
        </button>
      </div>
    </header>
  );
}