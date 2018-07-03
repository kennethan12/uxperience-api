import { model, property, Entity } from "@loopback/repository";


@model({
  name: "user"
})
export class User extends Entity {

  @property({
    type: "number",
    id: true // increment
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
    type: "string",
  })
  phone: string;

  @property({
    type: "string"
  })
  photoUrl: "string"

  getUserId() {
    return this.userId;
  }

}
