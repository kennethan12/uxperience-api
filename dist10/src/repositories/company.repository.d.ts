import { DefaultCrudRepository } from "@loopback/repository";
import { Company } from "../models/company";
import { DataSource } from "loopback-datasource-juggler";
export declare class CompanyRepository extends DefaultCrudRepository<Company, typeof Company.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
