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
exports.CarrosService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CarrosService = class CarrosService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listarTodos() {
        return this.prisma.carro.findMany({
            where: {
                ativo: true,
            },
            orderBy: {
                criadoEm: 'desc',
            },
        });
    }
    async pesquisar(filtros) {
        const where = {
            ativo: true,
        };
        if (filtros.precoMax) {
            where.preco = {
                lte: Number(filtros.precoMax),
            };
        }
        if (filtros.precoMin) {
            where.preco = {
                ...where.preco,
                gte: Number(filtros.precoMin),
            };
        }
        if (filtros.carrocaria) {
            where.carrocaria = {
                equals: filtros.carrocaria,
                mode: 'insensitive',
            };
        }
        if (filtros.cor) {
            where.cor = {
                equals: filtros.cor,
                mode: 'insensitive',
            };
        }
        if (filtros.transmissao) {
            where.transmissao = {
                equals: filtros.transmissao,
                mode: 'insensitive',
            };
        }
        if (filtros.modelo) {
            where.modelo = {
                contains: filtros.modelo,
                mode: 'insensitive',
            };
        }
        return this.prisma.carro.findMany({
            where,
            orderBy: {
                preco: 'asc',
            },
        });
    }
};
exports.CarrosService = CarrosService;
exports.CarrosService = CarrosService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CarrosService);
//# sourceMappingURL=carros.service.js.map