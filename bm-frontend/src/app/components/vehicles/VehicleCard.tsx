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

type VehicleCardProps = {
  vehicle: Vehicle;
  onSelectVehicle: (vehicle: Vehicle) => void;
};

export default function VehicleCard({
  vehicle,
  onSelectVehicle,
}: VehicleCardProps) {
  return (
    <article
      onClick={() => onSelectVehicle(vehicle)}
      className="cursor-pointer overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-56 w-full bg-gray-100">
        {vehicle.imageUrl ? (
          <img
            src={vehicle.imageUrl}
            alt={vehicle.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-sm text-gray-500">
            Sem imagem
          </div>
        )}

        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-700 backdrop-blur">
          BMW
        </div>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-2 text-xl font-semibold leading-snug text-gray-900">
          {vehicle.name}
        </h3>

        <p className="mt-4 text-3xl font-bold tracking-tight text-blue-600">
          {vehicle.price.toLocaleString('pt-PT')} €
        </p>

        <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
          <div className="rounded-2xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">Km</p>
            <p className="mt-1 font-medium text-gray-800">
              {vehicle.kilometers.toLocaleString('pt-PT')}
            </p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">
              Comb.
            </p>
            <p className="mt-1 font-medium text-gray-800">{vehicle.fuel}</p>
          </div>

          <div className="rounded-2xl bg-gray-50 p-3">
            <p className="text-xs uppercase tracking-wide text-gray-400">Ano</p>
            <p className="mt-1 font-medium text-gray-800">{vehicle.year}</p>
          </div>
        </div>

        <p className="mt-4 text-sm font-semibold text-blue-600">
          Ver detalhes →
        </p>
      </div>
    </article>
  );
}