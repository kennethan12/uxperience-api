import { Entity } from "@loopback/repository";
export declare class Product extends Entity {
    product_id: number;
    provider_id: number;
    name: string;
    description: string;
    category_id: number;
    photo_url: string;
    city: string;
    rating: number;
    getProductId(): number;
}
