import { DefaultCrudRepository } from "@loopback/repository";
import { Company } from "../models/company";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id
  >

{
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Company, datasource);
  }
}
