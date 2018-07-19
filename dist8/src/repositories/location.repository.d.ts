import { DefaultCrudRepository } from "@loopback/repository";
import { Location } from "../models/location";
import { DataSource } from "loopback-datasource-juggler";
export declare class LocationRepository extends DefaultCrudRepository<Location, typeof Location.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
