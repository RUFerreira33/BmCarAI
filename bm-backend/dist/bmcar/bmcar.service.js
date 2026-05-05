"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BmcarService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const rxjs_1 = require("rxjs");
let BmcarService = class BmcarService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    buildUrl(filters) {
        const precoMin = filters.precoMin ?? 0;
        const precoMax = filters.precoMax ?? 999999;
        const params = new URLSearchParams({
            financeTypeId: String(filters.financeTypeId ?? 1),
            numberMonths: '',
            initialDeposit: '3000',
            annualMileage: '-1',
            maxVehicles: '',
            kmMin: filters.kmsMin != null ? String(filters.kmsMin) : '',
            kmMax: filters.kmsMax != null ? String(filters.kmsMax) : '',
        });
        return `https://api.bmcar.pt/vehicle/calculated/${precoMin}/to/${precoMax}?${params.toString()}`;
    }
    async searchVehicles(filters) {
        const url = this.buildUrl(filters);
        try {
            const { data } = await (0, rxjs_1.firstValueFrom)(this.httpService.get(url, { timeout: 10000 }));
            console.log('URL PEDIDO:', url);
            console.log('RESPOSTA COMPLETA DA BMCar:');
            console.log(JSON.stringify(data, null, 2));
            const vehicles = data?.data?.vehiclesCalculated ?? [];
            console.log('PRIMEIRO VEÍCULO:');
            console.log(JSON.stringify(vehicles[0], null, 2));
            const mappedVehicles = vehicles.map((vehicle) => this.mapVehicle(vehicle));
            return this.applyFilters(mappedVehicles, filters);
        }
        catch (error) {
            throw new common_1.BadGatewayException('Erro ao obter veículos da BMCar');
        }
    }
    mapVehicle(vehicle) {
        const imagePath = vehicle?.images?.[0] || vehicle?.imageProductUrl;
        let imageUrl;
        if (imagePath) {
            const filename = imagePath.split('/').pop();
            imageUrl = `https://files-bmcar.prod.miewstudio.com/750/386/${filename}`;
        }
        return {
            externalId: vehicle.id,
            name: this.normalizeName(vehicle.name),
            slug: vehicle.slug,
            brand: vehicle.brandName,
            model: vehicle.modelName,
            vehicleType: this.normalizeVehicleType(vehicle.segmentName),
            segment: this.normalizeSegment(vehicle.segmentName),
            price: vehicle.price,
            priceOriginal: vehicle.priceOriginal,
            kilometers: vehicle.kilometers,
            year: vehicle.year,
            powerHp: vehicle.powerHp,
            fuel: this.normalizeFuel(vehicle.engine),
            displacement: vehicle.displacement,
            isNew: vehicle.isNew,
            imageUrl,
        };
    }
    normalizeFuel(engine) {
        if (!engine)
            return null;
        const e = engine.toLowerCase();
        if (e.includes('petrol'))
            return 'Gasolina';
        if (e.includes('diesel'))
            return 'Gasoleo';
        if (e.includes('electric'))
            return 'Elétrico';
        if (e.includes('hybrid'))
            return 'Híbrido';
        return engine.trim();
    }
    normalizeSegment(segment) {
        if (!segment)
            return null;
        const s = segment.toLowerCase();
        if (s.includes('motorrad'))
            return 'Moto';
        if (s.includes('suv'))
            return 'SUV';
        if (s.includes('sav'))
            return 'SUV';
        if (s.includes('touring'))
            return 'Carrinha';
        return segment.trim();
    }
    normalizeVehicleType(segment) {
        if (!segment)
            return null;
        const s = segment.toLowerCase();
        if (s.includes('motorrad'))
            return 'Moto';
        return 'Carro';
    }
    normalizeName(name) {
        if (!name)
            return null;
        return name.trim();
    }
    applyFilters(vehicles, filters) {
        let result = [...vehicles];
        if (filters.fuel) {
            const fuel = this.normalizeText(filters.fuel);
            result = result.filter(vehicle => this.normalizeText(vehicle.fuel).includes(fuel));
        }
        if (filters.segment) {
            const segment = this.normalizeText(filters.segment);
            result = result.filter(vehicle => this.normalizeText(vehicle.segment).includes(segment));
        }
        if (filters.vehicleType) {
            const vehicleType = this.normalizeText(filters.vehicleType);
            result = result.filter(vehicle => this.normalizeText(vehicle.vehicleType).includes(vehicleType));
        }
        if (filters.model) {
            const model = this.normalizeText(filters.model);
            result = result.filter(vehicle => this.normalizeText(vehicle.model).includes(model));
        }
        if (filters.yearMin != null) {
            result = result.filter(vehicle => vehicle.year != null && vehicle.year >= filters.yearMin);
        }
        if (filters.yearMax != null) {
            result = result.filter(vehicle => vehicle.year != null && vehicle.year <= filters.yearMax);
        }
        if (filters.isNew != null) {
            result = result.filter(vehicle => vehicle.isNew === filters.isNew);
        }
        return result;
    }
    normalizeText(value) {
        if (!value)
            return '';
        return value
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    }
};
exports.BmcarService = BmcarService;
exports.BmcarService = BmcarService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], BmcarService);
//# sourceMappingURL=bmcar.service.js.map