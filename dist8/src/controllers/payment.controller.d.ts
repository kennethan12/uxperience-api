import { TransactionRepository } from "../repositories/transaction.repository";
import { Transaction } from "loopback-datasource-juggler";
export declare class PaymentController {
    protected transactionRepo: TransactionRepository;
    constructor(transactionRepo: TransactionRepository);
    makePayment(transaction: Transaction): Promise<any>;
}
