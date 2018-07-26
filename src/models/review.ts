import { Entity, model, property } from "@loopback/repository";

@model({
  name: 'review'
})
export class Review extends Entity {

  @property({
    type: 'number',
    id: true
  })
  review_id: number

  @property({
    type: 'number'
  })
  reviewer_id: number

  @property({
    type: 'number'
  })
  product_id: number

  @property({
    type: 'number'
  })
  rating: number

  @property({
    type: 'string'
  })
  description: string

}
