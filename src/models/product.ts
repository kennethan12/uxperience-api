import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'product'
})
export class Product extends Entity {

  @property({
    type: "number",
    id: true // increment
  })
  product_id: number;

  @property({
    type: "number"
  })
  provider_id: number; // user id

  @property({
    type: 'string'
  })
  name: string;

  @property({
    type: "string"
  })
  description: string;

  @property({
    type: 'number'
  })
  category_id: number;

  @property({
    type: "string"
  })
  photo_url: string;

  @property({
    type: "string"
  })
  city: string;

  @property({
    type: 'number'
  })
  rating: number;

  getProductId() {
    return this.product_id;
  }
}
