import { DefaultCrudRepository } from "@loopback/repository";
import { Product } from "../models/product";
import { DataSource } from "loopback-datasource-juggler";
export declare class ProductRepository extends DefaultCrudRepository<Product, typeof Product.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
