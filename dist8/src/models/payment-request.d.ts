import { Model } from "@loopback/repository";
export declare class PaymentRequest extends Model {
    stripeToken: string;
    menuId: number;
}
