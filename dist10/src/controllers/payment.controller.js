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
const transaction_repository_1 = require("../repositories/transaction.repository");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const user_repository_1 = require("../repositories/user.repository");
const menu_repository_1 = require("../repositories/menu.repository");
const payment_request_1 = require("../models/payment-request");
const product_repository_1 = require("../repositories/product.repository");
const jsonwebtoken_1 = require("jsonwebtoken");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let PaymentController = class PaymentController {
    constructor(transactionRepo, userRepo, menuRepo, productRepo) {
        this.transactionRepo = transactionRepo;
        this.userRepo = userRepo;
        this.menuRepo = menuRepo;
        this.productRepo = productRepo;
    }
    async makePayment(jwt, menu_id, paymentRequest) {
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        // Use the product ID in the product repo to find the price
        let stripe = require("stripe")("sk_test_pzMWwDz7pwde0nT3Tjx3uxN4");
        console.log("before foundMenu");
        let foundMenu = await this.menuRepo.findById(menu_id);
        let foundProduct = await this.productRepo.findById(foundMenu.product_id);
        try {
            const charge = await stripe.charges.create({
                source: 'tok_visa',
                currency: "usd",
                amount: foundMenu.price * 100
            });
            console.log(charge);
            // Create a Transaction in your Transaction Repo
            let createdTransaction = await this.transactionRepo.create({
                stripe_charge_id: charge.id,
                price: foundMenu.price,
                customer_token: jwt,
                customer_id: user.user_id,
                provider_id: foundProduct.provider_id,
                menu_id,
                date_sold: new Date().toString()
            });
            // Return the transaction
            return createdTransaction;
        }
        catch (e) {
            console.log(e);
            throw new rest_1.HttpErrors.BadRequest("Charge failed");
        }
    }
    // retrieve a charge (get method)
    async getTransactions(jwt) {
        /* tslint:disable no-any */
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        let foundTransactions = await this.transactionRepo.find({
            where: {
                customer_id: user.user_id
            }
        });
        return foundTransactions;
    }
};
__decorate([
    rest_1.post('/payments'),
    __param(0, rest_1.param.query.string("jwt")),
    __param(1, rest_1.param.query.string("menu_id")),
    __param(2, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, payment_request_1.PaymentRequest]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "makePayment", null);
__decorate([
    rest_1.get('/gettransactions'),
    __param(0, rest_1.param.query.string('jwt')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "getTransactions", null);
PaymentController = __decorate([
    __param(0, repository_1.repository(transaction_repository_1.TransactionRepository.name)),
    __param(1, repository_1.repository(user_repository_1.UserRepository.name)),
    __param(2, repository_1.repository(menu_repository_1.MenuRepository.name)),
    __param(3, repository_1.repository(product_repository_1.ProductRepository.name)),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository,
        user_repository_1.UserRepository,
        menu_repository_1.MenuRepository,
        product_repository_1.ProductRepository])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map