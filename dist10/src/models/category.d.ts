import { Entity } from "@loopback/repository";
export declare class Category extends Entity {
    category_id: number;
    name: string;
    getCategoryId(): number;
}
