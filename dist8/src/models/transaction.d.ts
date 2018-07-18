import { Entity } from "@loopback/repository";
export declare class Transaction extends Entity {
    transaction_id: number;
    stripe_charge_id: string;
    price: number;
    customer_token: string;
    customer_id: number;
    provider_id: number;
    menu_id: number;
    date_sold: string;
    getTransactionId(): number;
}
