import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'transaction'
})
export class Transaction extends Entity {

  @property({
    type: 'number',
    id: true
  })
  transaction_id: number;

  @property({
    type: 'string'
  })
  stripe_charge_id: string;

  @property({
    type: 'number'
  })
  price: number;

  @property({
    type: 'string'
  })
  customer_token: string;

  @property({
    type: 'number'
  })
  customer_id: number; // user id

  @property({
    type: 'number'
  })
  provider_id: number; // user id

  @property({
    type: 'number'
  })
  menu_id: number; // menu id

  @property({
    type: 'string'
  })
  date_sold: string;

  getTransactionId() {
    return this.transaction_id;
  }

}
