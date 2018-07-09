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
const repository_1 = require("@loopback/repository");
const product_repository_1 = require("../repositories/product.repository");
const rest_1 = require("@loopback/rest");
const product_1 = require("../models/product");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let ProductListController = class ProductListController {
    constructor(productRepo) {
        this.productRepo = productRepo;
    }
    async createProduct(product) {
        let createdProduct = await this.productRepo.create(product);
        return createdProduct;
    }
    async findProduct(name) {
        return await this.productRepo.find({
            where: {
                name
            }
        });
    }
    async getAllUsers() {
        return await this.productRepo.find();
    }
};
__decorate([
    rest_1.post("/addproduct"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_1.Product]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "createProduct", null);
__decorate([
    rest_1.get("/product"),
    __param(0, rest_1.param.query.string("name")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "findProduct", null);
__decorate([
    rest_1.get("/allproducts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getAllUsers", null);
ProductListController = __decorate([
    __param(0, repository_1.repository(product_repository_1.ProductRepository.name)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository])
], ProductListController);
exports.ProductListController = ProductListController;
//# sourceMappingURL=product-list.controller.js.map