import { Entity } from "@loopback/repository";
export declare class Location extends Entity {
    location_id: number;
    address: number;
    city_name: string;
    state_province_region: string;
    zip_number: string;
    country: string;
    getLocationId(): number;
}
