import { Entity } from "@loopback/repository";
export declare class Menu extends Entity {
    menu_id: number;
    product_id: number;
    date: string;
    time: string;
    price: number;
    location_id: number;
    availability: boolean;
    getMenuId(): number;
}
