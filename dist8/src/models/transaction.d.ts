import { Entity } from "@loopback/repository";
export declare class Transaction extends Entity {
    transaction_id: number;
    customer_id: number;
    provider_id: number;
    menu_id: number;
    date_sold: Date;
    getTransactionId(): number;
}
