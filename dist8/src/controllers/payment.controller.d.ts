import { TransactionRepository } from "../repositories/transaction.repository";
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
    makePayment(jwt: string, paymentRequest: PaymentRequest): Promise<any>;
}
