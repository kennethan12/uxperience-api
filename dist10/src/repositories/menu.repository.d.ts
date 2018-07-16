import { DefaultCrudRepository } from "@loopback/repository";
import { Menu } from "../models/menu";
import { DataSource } from "loopback-datasource-juggler";
export declare class MenuRepository extends DefaultCrudRepository<Menu, typeof Menu.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
