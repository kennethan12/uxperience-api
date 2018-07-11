import { TransactionRepository } from "../repositories/transaction.repository";
import { repository } from "@loopback/repository";
import { post, requestBody } from "@loopback/rest";
import { Transaction } from "loopback-datasource-juggler";

// Uncomment these imports to begin using these cool features!

// import {inject} from '@loopback/context';


export class PaymentController {
  constructor(
    @repository(TransactionRepository.name) protected transactionRepo: TransactionRepository
  ) { }

  @post('/transaction')
  async makePayment(@requestBody() transaction: Transaction) {

    let stripe = require("stripe")("sk_test_pzMWwDz7pwde0nT3Tjx3uxN4");

    const charge = stripe.charges.create({
      amount: 999,
      currency: 'usd',
      source: 'tok_visa',
      receipt_email: 'jenny.rosen@example.com',
    });

    return charge;
  }
}
