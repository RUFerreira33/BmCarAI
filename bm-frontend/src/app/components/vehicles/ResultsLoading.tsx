export default function ResultsLoading() {
  return (
    <section className="flex h-full items-center justify-center px-6 py-10">
      <div className="w-full max-w-2xl rounded-3xl border border-blue-100 bg-white p-10 text-center shadow-sm">
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />

        <p className="text-sm font-semibold text-blue-700">
          Assistente BMCar
        </p>

        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
          A analisar o teu pedido
        </h2>

        <p className="mt-3 text-sm text-gray-600">
          Estamos a procurar os veículos que melhor correspondem ao que procuras.
        </p>
      </div>
    </section>
  );
}