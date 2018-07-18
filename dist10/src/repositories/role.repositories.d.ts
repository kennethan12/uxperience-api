import { DefaultCrudRepository } from "@loopback/repository";
import { Role } from "../models/role";
import { DataSource } from "loopback-datasource-juggler";
export declare class RoleRepository extends DefaultCrudRepository<Role, typeof Role.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
