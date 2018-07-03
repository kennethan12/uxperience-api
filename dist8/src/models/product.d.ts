import { Entity } from "@loopback/repository";
export declare class Product extends Entity {
    productId: number;
    name: string;
    price: number;
    description: string;
    date: string;
    categoryId: number;
    locationId: number;
    photoUrl: "string";
    getProductId(): number;
}
