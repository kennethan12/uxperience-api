import { DefaultCrudRepository } from "@loopback/repository";
import { City } from "../models/city";
import { DataSource } from "loopback-datasource-juggler";
export declare class CityRepository extends DefaultCrudRepository<City, typeof City.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
