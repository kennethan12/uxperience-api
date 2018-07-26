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
const category_repository_1 = require("../repositories/category.repository");
const category_1 = require("../models/category");
const rest_1 = require("@loopback/rest");
const product_repository_1 = require("../repositories/product.repository");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let CategoriesController = class CategoriesController {
    constructor(categoryRepo, productRepo) {
        this.categoryRepo = categoryRepo;
        this.productRepo = productRepo;
    }
    async addCategory(category) {
        let categoryExists = !!(await this.categoryRepo.count({
            and: [
                { name: category.name }
            ],
        }));
        if (categoryExists) {
            let existingCategory = await this.categoryRepo.findOne({
                where: {
                    name: category.name
                }
            });
            return existingCategory;
        }
        ;
        let newCategory = await this.categoryRepo.create({
            name: category.name
        });
        return newCategory;
    }
    async getCategoryProducts(category_id) {
        let categoryProducts = await this.productRepo.find({
            where: {
                category_id
            }
        });
        return categoryProducts;
    }
    async getCategoryByID(category_id) {
        return await this.categoryRepo.findOne({
            where: {
                category_id: category_id
            }
        });
    }
    async getCategoryByName(category_name) {
        return await this.categoryRepo.findOne({
            where: {
                name: category_name
            }
        });
    }
    async getAllCategories() {
        let allCategories = await this.categoryRepo.find();
        return allCategories;
    }
};
__decorate([
    rest_1.post('/addcategory'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [category_1.Category]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "addCategory", null);
__decorate([
    rest_1.get('/categoryproducts'),
    __param(0, rest_1.param.query.number('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryProducts", null);
__decorate([
    rest_1.get('/categorybyid'),
    __param(0, rest_1.param.query.number('category_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryByID", null);
__decorate([
    rest_1.get('/categorybyname'),
    __param(0, rest_1.param.query.string('category_name')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getCategoryByName", null);
__decorate([
    rest_1.get('/allcategories'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CategoriesController.prototype, "getAllCategories", null);
CategoriesController = __decorate([
    __param(0, repository_1.repository(category_repository_1.CategoryRepository.name)),
    __param(1, repository_1.repository(product_repository_1.ProductRepository.name)),
    __metadata("design:paramtypes", [category_repository_1.CategoryRepository,
        product_repository_1.ProductRepository])
], CategoriesController);
exports.CategoriesController = CategoriesController;
//# sourceMappingURL=categories.controller.js.map