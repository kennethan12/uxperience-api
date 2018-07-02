import { Entity } from "@loopback/repository";
export declare class User extends Entity {
    userId: number;
    email: string;
    name: string;
    password: string;
    phone: number;
    getUserId(): number;
}
