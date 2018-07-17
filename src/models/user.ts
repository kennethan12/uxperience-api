import { model, property, Entity } from "@loopback/repository";


@model({
  name: "user" // links to 'user' table in sql
})
export class User extends Entity {

  @property({
    type: "number",
    id: true // increment
  })
  user_id: number;

  @property({
    type: "string"
  })
  email: string;

  @property({
    type: "string"
  })
  firstname: string;

  @property({
    type: "string"
  })
  lastname: string;

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
  photo_url: string;

  getUserId() {
    return this.user_id;
  }

}
