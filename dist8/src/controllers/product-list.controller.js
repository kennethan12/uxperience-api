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
<<<<<<< HEAD
    async createProduct(jwt, productName, productDescription, city, menu) {
=======
    async createProduct(jwt, product) {
>>>>>>> 48f7f65928cd9444d29cab8b16560045b72e746f
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        let createdProduct = await this.productRepo.create({
<<<<<<< HEAD
            name: productName,
            description: productDescription,
            provider_id: user.id,
            city: city
=======
            name: product.name,
            description: product.description,
            provider_id: user.id
>>>>>>> 48f7f65928cd9444d29cab8b16560045b72e746f
        });
        return createdProduct;
    }
    async createMenu(product_id, menu) {
        let foundProduct = await this.productRepo.findById(product_id);
        let createdMenu = await this.menuRepo.create({
            price: menu.price,
            date: menu.date,
            time: menu.time,
            product_id: foundProduct.product_id,
            availability: true
        });
        return createdMenu;
    }
    async getAllProducts() {
        return await this.productRepo.find();
    }
    async getAllMenuItems(product_id) {
        let findMenuItems = this.menuRepo.find({
            where: {
                product_id,
                availability: true
            }
        });
        return findMenuItems;
    }
<<<<<<< HEAD
    //NEW
    async getProductByLocation(locationName) {
        return await this.productRepo.find({
            where: {
                city: locationName
            }
        });
=======
    async getOneMenu(menu_id) {
        let findMenu = await this.menuRepo.findById(menu_id);
        return findMenu;
    }
    async getOneProduct(product_id) {
        let foundProduct = await this.productRepo.findById(product_id);
        return foundProduct;
>>>>>>> 48f7f65928cd9444d29cab8b16560045b72e746f
    }
};
__decorate([
    rest_1.post("/addproduct"),
    __param(0, rest_1.param.query.string("jwt")),
<<<<<<< HEAD
    __param(1, rest_1.param.query.string("productName")),
    __param(2, rest_1.param.query.string("productDescription")),
    __param(3, rest_1.param.query.string("city")),
    __param(4, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, menu_1.Menu]),
=======
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_1.Product]),
>>>>>>> 48f7f65928cd9444d29cab8b16560045b72e746f
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "createProduct", null);
__decorate([
    rest_1.post('/addmenu'),
    __param(0, rest_1.param.query.number('product_id')),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, menu_1.Menu]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "createMenu", null);
__decorate([
    rest_1.get("/allproducts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getAllProducts", null);
__decorate([
    rest_1.get('/allmenuinfo'),
    __param(0, rest_1.param.query.number('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getAllMenuItems", null);
__decorate([
    rest_1.get('/menuinfo'),
    __param(0, rest_1.param.query.number('menu_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getOneMenu", null);
__decorate([
    rest_1.get('/productinfo'),
    __param(0, rest_1.param.query.number('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
<<<<<<< HEAD
], ProductListController.prototype, "getMenuItems", null);
__decorate([
    rest_1.get("/productbylocation"),
    __param(0, rest_1.param.query.string("city")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getProductByLocation", null);
=======
], ProductListController.prototype, "getOneProduct", null);
>>>>>>> 48f7f65928cd9444d29cab8b16560045b72e746f
ProductListController = __decorate([
    __param(0, repository_1.repository(product_repository_1.ProductRepository.name)),
    __param(1, repository_1.repository(menu_repository_1.MenuRepository.name)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        menu_repository_1.MenuRepository])
], ProductListController);
exports.ProductListController = ProductListController;
//# sourceMappingURL=product-list.controller.js.map