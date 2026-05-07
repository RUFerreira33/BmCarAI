import VehicleCard from './VehicleCard';

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
type RecommendedVehiclesProps = {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
};

export default function RecommendedVehicles({
  vehicles,
  onSelectVehicle,
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
          <VehicleCard
            key={vehicle.externalId}
            vehicle={vehicle}
            onSelectVehicle={onSelectVehicle}
          />
        ))}
      </div>
    </section>
  );
}