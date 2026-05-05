type FiltersPanelProps = {
  filters: Record<string, unknown> | null;
};

export default function FiltersPanel({ filters }: FiltersPanelProps) {
  if (!filters) return null;

  const entries = Object.entries(filters).filter(
    ([, value]) => value !== null && value !== undefined && value !== '',
  );

  if (entries.length === 0) return null;

  return (
    <div className="rounded-2xl border bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-lg font-semibold">Filtros interpretados</h3>

      <div className="flex flex-wrap gap-2">
        {entries.map(([key, value]) => (
          <span
            key={key}
            className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
          >
            <strong>{key}:</strong> {String(value)}
          </span>
        ))}
      </div>
    </div>
  );
}