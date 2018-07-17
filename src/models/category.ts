import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'category'
})
export class Category extends Entity {

  @property({
    type: 'number',
    id: true
  })
  category_id: number;

  @property({
    type: 'string'
  })
  name: string;

  getCategoryId() {
    return this.category_id;
  }

}
