import { DefaultCrudRepository } from "@loopback/repository";
import { Transaction } from "../models/transaction";
import { DataSource } from "loopback-datasource-juggler";
export declare class TransactionRepository extends DefaultCrudRepository<Transaction, typeof Transaction.prototype.id> {
    protected datasource: DataSource;
    constructor(datasource: DataSource);
}
