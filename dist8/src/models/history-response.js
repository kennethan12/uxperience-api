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
const repository_1 = require("@loopback/repository");
const product_1 = require("./product");
const menu_1 = require("./menu");
let HistoryResponse = class HistoryResponse extends repository_1.Model {
};
__decorate([
    repository_1.property(),
    __metadata("design:type", product_1.Product)
], HistoryResponse.prototype, "product", void 0);
__decorate([
    repository_1.property(),
    __metadata("design:type", menu_1.Menu)
], HistoryResponse.prototype, "menu", void 0);
HistoryResponse = __decorate([
    repository_1.model()
], HistoryResponse);
exports.HistoryResponse = HistoryResponse;
//# sourceMappingURL=history-response.js.map