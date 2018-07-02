import { DefaultCrudRepository } from "@loopback/repository";
import { DataSource } from "loopback-datasource-juggler";
import { inject } from "@loopback/core";
import { User } from "../models/user";

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id
  >

{

  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(User, datasource);
  }
}
