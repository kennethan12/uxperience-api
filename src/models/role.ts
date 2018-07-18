import { model, Entity, property } from "@loopback/repository";

@model({
  name: 'role'
})
export class Role extends Entity {

  @property({
    type: 'number',
    id: true
  })
  role_id: number;

  @property({
    type: 'string'
  })
  name: string;

  getRoleId() {
    return this.role_id;
  }
}
