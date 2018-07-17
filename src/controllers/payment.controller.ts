import { TransactionRepository } from "../repositories/transaction.repository";
import { repository } from "@loopback/repository";
import { post, requestBody, param, HttpErrors } from "@loopback/rest";
import { Transaction } from "../models/transaction";
import { UserRepository } from "../repositories/user.repository";
import { MenuRepository } from "../repositories/menu.repository";
import { User } from "../models/user";
import { Menu } from "../models/menu";
import { PaymentRequest } from "../models/payment-request";
import { ProductRepository } from "../repositories/product.repository";
import { Product } from "../models/product";
import { verify } from "jsonwebtoken";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class PaymentController {

  constructor(
    @repository(TransactionRepository.name) protected transactionRepo: TransactionRepository,
    @repository(UserRepository.name) protected userRepo: UserRepository,
    @repository(MenuRepository.name) protected menuRepo: MenuRepository,
    @repository(ProductRepository.name) protected productRepo: ProductRepository
  ) { }

  @post('/payments')
  async makePayment(
    @param.query.string("jwt") jwt: string,
    @param.query.string("menu_id") menu_id: number,
    @requestBody() paymentRequest: PaymentRequest
  ) {

    let user = null;
    try {
      let payload = verify(jwt, 'shh') as any;
      user = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }

    // Use the product ID in the product repo to find the price

    let stripe = require("stripe")("sk_test_pzMWwDz7pwde0nT3Tjx3uxN4");

    let foundMenu = this.menuRepo.findOne({
      where: {
        menu_id
      }
    });

    try {
      const charge = await stripe.charges.create({
        source: paymentRequest.stripeToken,
        currency: "usd",
        amount: foundMenu
      });

      // Create a Transaction in your Transaction Repo
      // Return the transaction

      return charge;
    } catch (e) {
      console.log(e);
      throw new HttpErrors.BadRequest("Charge failed");
    }

  }

  // retrieve a charge (get method)
}
