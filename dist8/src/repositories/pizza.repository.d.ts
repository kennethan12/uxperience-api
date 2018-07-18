import { DefaultCrudRepository } from "@loopback/repository";
import { Pizza } from "../models/pizza";
import { DataSource } from "loopback-datasource-juggler";
export declare class PizzaRepository extends DefaultCrudRepository<Pizza, typeof Pizza.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
