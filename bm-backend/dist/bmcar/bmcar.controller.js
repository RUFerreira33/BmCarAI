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
exports.BmcarController = void 0;
const common_1 = require("@nestjs/common");
const bmcar_service_1 = require("./bmcar.service");
const search_vehicles_dto_1 = require("./dto/search-vehicles.dto");
let BmcarController = class BmcarController {
    constructor(bmcarService) {
        this.bmcarService = bmcarService;
    }
    async searchVehicles(query) {
        return this.bmcarService.searchVehicles(query);
    }
};
exports.BmcarController = BmcarController;
__decorate([
    (0, common_1.Get)('veiculos'),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [search_vehicles_dto_1.SearchVehiclesDto]),
    __metadata("design:returntype", Promise)
], BmcarController.prototype, "searchVehicles", null);
exports.BmcarController = BmcarController = __decorate([
    (0, common_1.Controller)('bmcar'),
    __metadata("design:paramtypes", [bmcar_service_1.BmcarService])
], BmcarController);
//# sourceMappingURL=bmcar.controller.js.map