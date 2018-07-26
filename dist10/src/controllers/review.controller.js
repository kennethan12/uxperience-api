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
const review_repository_1 = require("../repositories/review.repository");
const rest_1 = require("@loopback/rest");
const review_1 = require("../models/review");
const jsonwebtoken_1 = require("jsonwebtoken");
const product_repository_1 = require("../repositories/product.repository");
const user_repository_1 = require("../repositories/user.repository");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let ReviewController = class ReviewController {
    constructor(reviewRepo, productRepo, userRepo) {
        this.reviewRepo = reviewRepo;
        this.productRepo = productRepo;
        this.userRepo = userRepo;
    }
    async addReview(jwt, product_id, review) {
        /* tslint:disable no-any */
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        let reviewExists = !!(await this.reviewRepo.count({
            and: [
                {
                    reviewer_id: user.user_id,
                    product_id: product_id
                }
            ]
        }));
        if (reviewExists) {
            throw new rest_1.HttpErrors.BadRequest('review already exists');
        }
        let productReview = await this.reviewRepo.create({
            reviewer_id: user.user_id,
            product_id: product_id,
            rating: review.rating,
            description: review.description
        });
        return productReview;
    }
    async getRating(product_id) {
        let reviews = await this.reviewRepo.find({
            where: {
                product_id
            }
        });
        let rating = 0;
        let reviewProduct = await this.productRepo.findById(product_id);
        for (let review of reviews) {
            rating = rating + review.rating;
        }
        rating = rating / reviews.length;
        reviewProduct.rating = rating;
        this.productRepo.save(reviewProduct);
        return reviewProduct;
    }
    async getReviews(product_id) {
        let reviews = await this.reviewRepo.find({
            where: {
                product_id
            }
        });
        let users = [];
        for (let review of reviews) {
            let user = await this.userRepo.findById(review.reviewer_id);
            users.push(user);
        }
        return {
            reviews: reviews,
            users: users
        };
    }
};
__decorate([
    rest_1.post('/addreview'),
    __param(0, rest_1.param.query.string('jwt')),
    __param(1, rest_1.param.query.number('product_id')),
    __param(2, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, review_1.Review]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "addReview", null);
__decorate([
    rest_1.get('/addrating'),
    __param(0, rest_1.param.query.number('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getRating", null);
__decorate([
    rest_1.get('/getreviews'),
    __param(0, rest_1.param.query.number('product_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ReviewController.prototype, "getReviews", null);
ReviewController = __decorate([
    __param(0, repository_1.repository(review_repository_1.ReviewRepository.name)),
    __param(1, repository_1.repository(product_repository_1.ProductRepository.name)),
    __param(2, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [review_repository_1.ReviewRepository,
        product_repository_1.ProductRepository,
        user_repository_1.UserRepository])
], ReviewController);
exports.ReviewController = ReviewController;
//# sourceMappingURL=review.controller.js.map