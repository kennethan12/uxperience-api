import { DefaultCrudRepository } from "@loopback/repository";
import { Product } from "../models/product";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id
  >

{

  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Product, datasource);
  }
}
