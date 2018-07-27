import { TransactionRepository } from "../repositories/transaction.repository";
import { Transaction } from "../models/transaction";
import { UserRepository } from "../repositories/user.repository";
import { MenuRepository } from "../repositories/menu.repository";
import { PaymentRequest } from "../models/payment-request";
import { ProductRepository } from "../repositories/product.repository";
export declare class PaymentController {
    protected transactionRepo: TransactionRepository;
    protected userRepo: UserRepository;
    protected menuRepo: MenuRepository;
    protected productRepo: ProductRepository;
    constructor(transactionRepo: TransactionRepository, userRepo: UserRepository, menuRepo: MenuRepository, productRepo: ProductRepository);
    makePayment(jwt: string, menu_id: number, paymentRequest: PaymentRequest): Promise<Transaction>;
    getTransactions(jwt: string): Promise<Array<Transaction>>;
}
