"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BmcarModule = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("@nestjs/axios");
const bmcar_controller_1 = require("./bmcar.controller");
const bmcar_service_1 = require("./bmcar.service");
let BmcarModule = class BmcarModule {
};
exports.BmcarModule = BmcarModule;
exports.BmcarModule = BmcarModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [bmcar_controller_1.BmcarController],
        providers: [bmcar_service_1.BmcarService],
        exports: [bmcar_service_1.BmcarService]
    })
], BmcarModule);
//# sourceMappingURL=bmcar.module.js.map