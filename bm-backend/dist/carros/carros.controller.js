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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarrosController = void 0;
const common_1 = require("@nestjs/common");
const carros_service_1 = require("./carros.service");
let CarrosController = class CarrosController {
    constructor(carrosService) {
        this.carrosService = carrosService;
    }
    async listar(query) {
        const temFiltros = Object.keys(query).length > 0;
        if (temFiltros) {
            return this.carrosService.pesquisar(query);
        }
        return this.carrosService.listarTodos();
    }
};
exports.CarrosController = CarrosController;
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarrosController.prototype, "listar", null);
exports.CarrosController = CarrosController = __decorate([
    (0, common_1.Controller)('carros'),
    __metadata("design:paramtypes", [carros_service_1.CarrosService])
], CarrosController);
//# sourceMappingURL=carros.controller.js.map