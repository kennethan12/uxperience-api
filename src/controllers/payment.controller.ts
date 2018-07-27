import { TransactionRepository } from "../repositories/transaction.repository";
import { repository } from "@loopback/repository";
import { post, requestBody, param, HttpErrors, get } from "@loopback/rest";
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

    console.log("before foundMenu")
    let foundMenu = await this.menuRepo.findById(menu_id);
    let foundProduct = await this.productRepo.findById(foundMenu.product_id)


    try {
      const charge = await stripe.charges.create({
        source: 'tok_visa', // paymentRequest.stripeToken,
        currency: "usd",
        amount: foundMenu.price * 100
      });

      console.log(charge)

      // Create a Transaction in your Transaction Repo
      let createdTransaction = await this.transactionRepo.create({
        stripe_charge_id: charge.id,
        price: foundMenu.price,
        customer_token: jwt,
        customer_id: user.user_id,
        provider_id: foundProduct.provider_id,
        menu_id,
        date_sold: new Date().toString()
      })
      // Return the transaction

      return createdTransaction;
    } catch (e) {
      console.log(e);
      throw new HttpErrors.BadRequest("Charge failed");
    }

  }

  // retrieve a charge (get method)
  @get('/gettransactions')
  async getTransactions(
    @param.query.string('jwt') jwt: string
  ): Promise<Array<Transaction>> {

    /* tslint:disable no-any */
    let user = null
    try {
      let payload = verify(jwt, 'shh') as any;
      user = payload.user;
    } catch (err) {
      throw new HttpErrors.Unauthorized("Invalid token")
    }

    let foundTransactions = await this.transactionRepo.find({
      where: {
        customer_id: user.user_id
      }
    })

    return foundTransactions
  }
}
