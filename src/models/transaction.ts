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
    type: 'DateTime'
  })
  date_sold: Date;

  getTransactionId() {
    return this.transaction_id;
  }

}
