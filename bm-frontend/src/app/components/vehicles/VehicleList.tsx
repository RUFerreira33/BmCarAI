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

type VehicleListProps = {
  vehicles: Vehicle[];
  onSelectVehicle: (vehicle: Vehicle) => void;
};

export default function VehicleList({
  vehicles,
  onSelectVehicle,
}: VehicleListProps) {
  return (
    <section className="px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900">
          Restantes resultados
        </h2>

        <p className="mb-5 text-sm text-gray-600">
          Lista completa dos outros veículos encontrados para o teu pedido.
        </p>

        {vehicles.length === 0 ? (
          <div className="rounded-2xl border bg-gray-50 p-6 text-gray-500">
            Não existem mais resultados para além dos recomendados.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
            {vehicles.map((vehicle) => (
              <VehicleCard
                key={vehicle.externalId}
                vehicle={vehicle}
                onSelectVehicle={onSelectVehicle}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}