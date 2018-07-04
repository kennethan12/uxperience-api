import { DefaultCrudRepository } from "@loopback/repository";
import { Menu } from "../models/menu";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class MenuRepository extends DefaultCrudRepository<
  Menu,
  typeof Menu.prototype.id
  >

{
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Menu, datasource);
  }
}
