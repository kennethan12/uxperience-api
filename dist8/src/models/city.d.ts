import { Entity } from "@loopback/repository";
export declare class City extends Entity {
    city_id: number;
    city_name: string;
    getCityName(): string;
}
