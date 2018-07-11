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
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let PaymentController = class PaymentController {
    constructor(transactionRepo) {
        this.transactionRepo = transactionRepo;
    }
    async makePayment(transaction) {
        let stripe = require("stripe")("sk_test_pzMWwDz7pwde0nT3Tjx3uxN4");
        const charge = stripe.charges.create({
            amount: 999,
            currency: 'usd',
            source: 'tok_visa',
            receipt_email: 'jenny.rosen@example.com',
        });
        return charge;
    }
};
__decorate([
    rest_1.post('/transaction'),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], PaymentController.prototype, "makePayment", null);
PaymentController = __decorate([
    __param(0, repository_1.repository(transaction_repository_1.TransactionRepository.name)),
    __metadata("design:paramtypes", [transaction_repository_1.TransactionRepository])
], PaymentController);
exports.PaymentController = PaymentController;
//# sourceMappingURL=payment.controller.js.map