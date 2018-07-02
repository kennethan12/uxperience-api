import { model, property, Entity } from "@loopback/repository";


@model({
  name: "user"
})
export class User extends Entity {

  @property({
    type: "number",
    id: true
  })
  userId: number;

  @property({
    type: "string"
  })
  email: string;

  @property({
    type: "string"
  })
  name: string;

  @property({
    type: "string"
  })
  password: string;

  @property({
    type: "number",
  })
  phone: number;

  getUserId() {
    return this.userId;
  }

}
