import { DefaultCrudRepository } from "@loopback/repository";
import { City } from "../models/city";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class CityRepository extends DefaultCrudRepository<
  City,
  typeof City.prototype.id
  >

{
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(City, datasource);
  }
}
