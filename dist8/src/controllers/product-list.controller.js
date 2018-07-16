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
const menu_repository_1 = require("../repositories/menu.repository");
const menu_1 = require("../models/menu");
const jsonwebtoken_1 = require("jsonwebtoken");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let ProductListController = class ProductListController {
    constructor(productRepo, menuRepo) {
        this.productRepo = productRepo;
        this.menuRepo = menuRepo;
    }
    async createProduct(jwt, productName, productDescription, menu) {
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        let createdProduct = await this.productRepo.create({
            name: productName,
            description: productDescription,
            provider_id: user.id
        });
        let createdMenu = await this.menuRepo.create({
            price: menu.price,
            date: menu.date,
            time: menu.time,
            product_id: createdProduct.product_id,
            availability: true
        });
        return {
            menu: createdMenu,
            product: createdProduct
        };
    }
    async getAllProducts() {
        return await this.productRepo.find();
    }
    async getMenuItems(product_id) {
        let findMenuItems = this.menuRepo.find({
            where: {
                product_id,
                availability: true
            }
        });
        return findMenuItems;
    }
};
__decorate([
    rest_1.post("/addproduct"),
    __param(0, rest_1.param.query.string("jwt")),
    __param(1, rest_1.param.query.string("productName")),
    __param(2, rest_1.param.query.string("productDescription")),
    __param(3, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, menu_1.Menu]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "createProduct", null);
__decorate([
    rest_1.get("/allproducts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getAllProducts", null);
__decorate([
    rest_1.get('/menuinfo'),
    __param(0, rest_1.param.query.number('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getMenuItems", null);
ProductListController = __decorate([
    __param(0, repository_1.repository(product_repository_1.ProductRepository.name)),
    __param(1, repository_1.repository(menu_repository_1.MenuRepository.name)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        menu_repository_1.MenuRepository])
], ProductListController);
exports.ProductListController = ProductListController;
//# sourceMappingURL=product-list.controller.js.map