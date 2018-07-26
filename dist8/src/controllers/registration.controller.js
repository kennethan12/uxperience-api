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
const bcrypt = require("bcrypt");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let RegistrationController = class RegistrationController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async createUser(user) {
        if (!user.email || !user.password || !user.firstname || !user.lastname) {
            throw new rest_1.HttpErrors.BadRequest('missing data');
        }
        if (user.email.indexOf("@") == -1) {
            throw new rest_1.HttpErrors.BadRequest('please input valid email');
        }
        // Check that user does not already exist
        let userExists = !!(await this.userRepo.count({
            and: [
                { email: user.email }
            ]
        }));
        if (userExists) {
            throw new rest_1.HttpErrors.BadRequest('user already exists');
        }
        if (user.password === user.confirmPassword) {
            let hashedPassword = await bcrypt.hash(user.password, 10);
            let createdUser = await this.userRepo.create({
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                password: hashedPassword,
                photo_url: user.photo_url
            });
            let createUser = {
                user_id: createdUser.user_id,
                email: createdUser.email,
                firstname: createdUser.firstname,
                lastname: createdUser.lastname,
                photo_url: createdUser.photo_url,
                phone: createdUser.phone
            };
            return createUser;
        }
        else {
            throw new rest_1.HttpErrors.BadRequest('password does not match');
        }
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