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
const user_repository_1 = require("../repositories/user.repository");
const user_1 = require("../models/user");
const rest_1 = require("@loopback/rest");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let RegistrationController = class RegistrationController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createUser(user) {
        let createdUser = await this.userRepo.create(user);
        return createdUser;
        /*
        pizza.status = "received";
        return pizza;
        */
    }
};
__decorate([
    rest_1.post("/registration"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], RegistrationController.prototype, "createUser", null);
RegistrationController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], RegistrationController);
exports.RegistrationController = RegistrationController;
//# sourceMappingURL=registration.controller.js.map