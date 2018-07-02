import { Entity } from "@loopback/repository";
export declare class Pizza extends Entity {
    id: number;
    name: string;
    toppingA: string;
    getId(): number;
}
