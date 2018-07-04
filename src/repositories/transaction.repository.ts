import { DefaultCrudRepository } from "@loopback/repository";
import { Transaction } from "../models/transaction";
import { inject } from "@loopback/core";
import { DataSource } from "loopback-datasource-juggler";

export class TransactionRepository extends DefaultCrudRepository<
  Transaction,
  typeof Transaction.prototype.id
  >

{
  constructor(@inject('datasources.db') protected datasource: DataSource) {
    super(Transaction, datasource);
  }
}
