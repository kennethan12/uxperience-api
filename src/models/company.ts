import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'company'
})
export class Company extends Entity {

  @property({
    type: 'number'
  })
  owner_id: number; // user id

  @property({
    type: 'number'
  })
  employee_id: number; // user id

  @property({
    type: 'number'
  })
  role_id: number; // role id

}
