import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'city'
})
export class City extends Entity {

  @property({
    type: 'string'
  })
  city_name: string

  getCityName() {
    return this.city_name;
  }
}
