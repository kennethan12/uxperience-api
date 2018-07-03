import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'product'
})
export class Product extends Entity {

  @property({
    type: "number",
    id: true // increment
  })
  productId: number;

  @property({
    type: "string"
  })
  name: string;

  @property({
    type: "number"
  })
  price: number;

  @property({
    type: "string"
  })
  description: string;

  @property({
    type: "string"
  })
  date: string;

  @property({
    type: "number"
  })
  categoryId: number;

  @property({
    type: "number"
  })
  locationId: number;

  @property({
    type: "string"
  })
  photoUrl: "string"

  getProductId() {
    return this.productId;
  }
}
