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
const rest_1 = require("@loopback/rest");
const pizza_1 = require("../models/pizza");
const repository_1 = require("@loopback/repository");
const pizza_repository_1 = require("../repositories/pizza.repository");
// Uncomment these imports to begin using these cool features!
// import {inject} from '@loopback/context';
let PizzaController = class PizzaController {
    constructor(pizzaRepo) {
        this.pizzaRepo = pizzaRepo;
    }
    async getAllPizzas(toppings) {
        /*var pizzas = new Array<any>();
    
        if (toppings == "pineapple") {
          pizzas.push("With Pineapple");
        } else {
          pizzas.push("Yum");
        }
    
        return pizzas;
        */
        return await this.pizzaRepo.find({
            where: {
                name: "abc"
            }
        });
    }
    getSpecificPizza(pizzaId) {
        if (pizzaId === "A") {
            return 'ABC';
        }
        if (pizzaId === "B") {
            return "BDC";
        }
        throw new rest_1.HttpErrors.NotFound("Sorry, pizza not found");
    }
    async createPizza(pizza) {
        let createdPizza = await this.pizzaRepo.create(pizza);
        return createdPizza;
        /*
        pizza.status = "received";
        return pizza;
        */
    }
};
__decorate([
    rest_1.get("/pizzas"),
    __param(0, rest_1.param.query.string("toppings")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "getAllPizzas", null);
__decorate([
    rest_1.get("/pizzas/{pizzaId}"),
    __param(0, rest_1.param.query.string("pizzaId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], PizzaController.prototype, "getSpecificPizza", null);
__decorate([
    rest_1.post("/pizzas"),
    __param(0, rest_1.requestBody()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pizza_1.Pizza]),
    __metadata("design:returntype", Promise)
], PizzaController.prototype, "createPizza", null);
PizzaController = __decorate([
    __param(0, repository_1.repository(pizza_repository_1.PizzaRepository.name)),
    __metadata("design:paramtypes", [pizza_repository_1.PizzaRepository])
], PizzaController);
exports.PizzaController = PizzaController;
//# sourceMappingURL=pizza.controller.js.map