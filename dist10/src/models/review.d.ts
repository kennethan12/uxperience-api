import { Entity } from "@loopback/repository";
export declare class Review extends Entity {
    review_id: number;
    reviewer_id: number;
    product_id: number;
    rating: number;
    description: string;
}
