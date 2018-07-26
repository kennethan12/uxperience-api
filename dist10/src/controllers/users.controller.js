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
const rest_1 = require("@loopback/rest");
const jsonwebtoken_1 = require("jsonwebtoken");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let UsersController = class UsersController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    async getAllUsers() {
        return await this.userRepo.find();
    }
    async getOneUser(jwt) {
        let user = null;
        try {
            let payload = jsonwebtoken_1.verify(jwt, 'shh');
            user = payload.user;
        }
        catch (err) {
            throw new rest_1.HttpErrors.Unauthorized("Invalid token");
        }
        return await this.userRepo.findById(user.user_id);
    }
    async changeProfilePic(url, userId) {
        await this.userRepo.updateById(userId, {
            photo_url: url
        });
        return await this.userRepo.findById(userId);
    }
    async getAnyUser(user_id) {
        let user = await this.userRepo.findById(user_id);
        return user;
    }
    async getHost(provider_id) {
        let foundHost = await this.userRepo.findById(provider_id);
        return foundHost;
    }
};
__decorate([
    rest_1.get("/users"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAllUsers", null);
__decorate([
    rest_1.get('/user'),
    __param(0, rest_1.param.query.string("jwt")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getOneUser", null);
__decorate([
    rest_1.get('/changeprofilepic'),
    __param(0, rest_1.param.query.string("url")),
    __param(1, rest_1.param.query.number("userid")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "changeProfilePic", null);
__decorate([
    rest_1.get('/anyuser'),
    __param(0, rest_1.param.query.number('user_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAnyUser", null);
__decorate([
    rest_1.get('/producthost'),
    __param(0, rest_1.param.query.number('provider_id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getHost", null);
UsersController = __decorate([
    __param(0, repository_1.repository(user_repository_1.UserRepository.name)),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map