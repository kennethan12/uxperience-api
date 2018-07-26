import { DefaultCrudRepository } from "@loopback/repository";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";
import { Review } from "../models/review";

export class ReviewRepository extends DefaultCrudRepository<
  Review,
  typeof Review.prototype.id
  >

{

  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Review, datasource);
  }
}
