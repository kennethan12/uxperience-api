import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'menu'
})
export class Menu extends Entity {

  @property({
    type: 'number',
    id: true
  })
  menu_id: number

  @property({
    type: 'number'
  })
  product_id: number

  @property({
    type: 'DateTime'
  })
  date_time: Date

  @property({
    type: 'number'
  })
  price: number

  @property({
    type: 'binary'
  })
  availability: boolean

  getMenuId() {
    return this.menu_id;
  }
}
