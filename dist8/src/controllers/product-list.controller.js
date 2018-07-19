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
const transaction_repository_1 = require("../repositories/transaction.repository");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let ProductListController = class ProductListController {
    constructor(productRepo, menuRepo, transactionRepo) {
        this.productRepo = productRepo;
        this.menuRepo = menuRepo;
        this.transactionRepo = transactionRepo;
        this.menuArray = [];
        this.productArray = [];
    }
    async createProduct(jwt, product) {
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        let createdProduct = await this.productRepo.create({
            name: product.name,
            description: product.description,
            category_id: product.category_id,
            provider_id: user.user_id,
            city: product.city,
            photo_url: product.photo_url
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
    //NEW
    async getProductByLocation(locationName) {
        return await this.productRepo.find({
            where: {
                city: locationName
            }
        });
    }
    async getOneMenu(menu_id) {
        let findMenu = await this.menuRepo.findById(menu_id);
        return findMenu;
    }
    async getOneProduct(product_id) {
        let foundProduct = await this.productRepo.findById(product_id);
        return foundProduct;
    }
    async getUserProducts(user_id) {
        let userProducts = await this.productRepo.find({
            where: {
                provider_id: user_id
            }
        });
        return userProducts;
    }
    async getBoughtProducts(user_id) {
        let userTransactions = await this.transactionRepo.find({
            where: {
                customer_id: user_id
            }
        });
        for (let i = 0; i < userTransactions.length; i++) {
            let userMenu = await this.menuRepo.findById(userTransactions[i].menu_id);
            this.menuArray.push(userMenu);
        }
        for (let i = 0; i < this.menuArray.length; i++) {
            let userProduct = await this.productRepo.findById(this.menuArray[i].product_id);
            this.productArray.push(userProduct);
        }
        return this.productArray;
    }
};
__decorate([
    rest_1.post("/addproduct"),
    __param(0, rest_1.param.query.string("jwt")),
    __param(1, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, product_1.Product]),
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
    rest_1.get("/productbylocation"),
    __param(0, rest_1.param.query.string("city")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getProductByLocation", null);
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
], ProductListController.prototype, "getOneProduct", null);
__decorate([
    rest_1.get('/myproducts'),
    __param(0, rest_1.param.query.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getUserProducts", null);
__decorate([
    rest_1.get('myboughtproducts'),
    __param(0, rest_1.param.query.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ProductListController.prototype, "getBoughtProducts", null);
ProductListController = __decorate([
    __param(0, repository_1.repository(product_repository_1.ProductRepository.name)),
    __param(1, repository_1.repository(menu_repository_1.MenuRepository.name)),
    __param(2, repository_1.repository(transaction_repository_1.TransactionRepository.name)),
    __metadata("design:paramtypes", [product_repository_1.ProductRepository,
        menu_repository_1.MenuRepository,
        transaction_repository_1.TransactionRepository])
], ProductListController);
exports.ProductListController = ProductListController;
//# sourceMappingURL=product-list.controller.js.map