import { DefaultCrudRepository } from "@loopback/repository";
import { Category } from "../models/category";
import { DataSource } from "loopback-datasource-juggler";
export declare class CategoryRepository extends DefaultCrudRepository<Category, typeof Category.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
