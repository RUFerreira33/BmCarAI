import VehicleCard from './VehicleCard';

type Vehicle = {
  externalId: string;
  name: string;
  price: number;
  kilometers: number;
  fuel: string;
  year: number;
  imageUrl?: string;
};

type RecommendedVehiclesProps = {
  vehicles: Vehicle[];
};

export default function RecommendedVehicles({
  vehicles,
}: RecommendedVehiclesProps) {
  if (vehicles.length === 0) return null;

  return (
    <section className="px-4 pt-6">
      <div className="mb-6 rounded-3xl border border-blue-100 bg-gradient-to-r from-blue-50 to-white p-6 shadow-sm">
        <p className="text-sm font-semibold text-blue-700">
            Recomendação da IA
        </p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight text-gray-900">
            As melhores opções para o teu pedido
        </h2>
         <p className="mt-2 text-sm text-gray-600">
            Selecionámos os veículos mais alinhados com o que procuras.
        </p>
       </div>

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
          {vehicles.map((vehicle) => (
            <VehicleCard key={vehicle.externalId} vehicle={vehicle} />
          ))}
        </div>
   
    </section>
  );
}